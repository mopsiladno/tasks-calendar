import db from '$lib/firebase';
import { getTasks, setTasks } from '$lib/functions';

/**
 * Массив задач на запрошенную дату.
 */
const tasks = [];

/**
 * Функция для получения даты в формате ISO из параметров запроса.
 * Если дата в нужном формате не обнаружена, то возвращаем null.
 */
function getDateFromRequestParams(params) {
    /**
     * Регулярное выражение для поиска даты в формате ISO.
     */
    const dateRegex = /\d{4}-\d{2}-\d{2}/g;

    /**
     * Результат применения регулярного выражения на значение параметра date.
     */
    const dateRegxExecResult = dateRegex.exec(params.date);

    /**
     * Если есть результат, то возвращаем из функции первое совпадение.
     */
    return dateRegxExecResult !== null ? dateRegxExecResult[0] : null;
}

/**
 * Endpoint для получения задач на запрошенный день.
 */
export async function get({ params }) {
    /**
     * Уникальный токен пользователя.
     */
    const token = params.token;

    /**
     * Дата в формате ISO из параметров запроса.
     */
    const date = getDateFromRequestParams(params);

    /**
     * Возвращаем 404 если в параметрах запроса передана неверная дата.
     */
    if (date === null) return { status: 404 };

    /**
     * Получаем задачи на день из БД.
     */
    tasks[date] = await getTasks(db, token, date) ?? [];

    /**
     * Возвращаем запрашиваемую дату и задачи на эту дату.
     */
    return {
        body: { tasks: tasks[date], date }
    };
}

/**
 * Endpoint для добавления задачи.
 */
export async function post({ params, request }) {
    /**
     * Уникальный токен пользователя.
     */
    const token = params.token;

    /**
     * Дата в формате ISO из параметров запроса.
     */
    const date = getDateFromRequestParams(params);

    /**
     * Возвращаем 404 если в параметрах запроса передана неверная дата.
     */
    if (date === null) return { status: 404 };

    /**
     * Ожидаем получения тела запроса.
     */
    const body = await request.json();

    /**
     * Добавляем дату в массив задач, если она отсутствует.
     */
    if (!tasks[date]) tasks[date] = [];

    /**
     * Добавляем задачу в массив задач на дату.
     */
    tasks[date].push(body.task);

    /**
     * Обновляем задачи на день в БД.
     */
    await setTasks(db, token, date, tasks[date]);

    /**
     * Возвращаем задачи на дату и саму дату.
     */
    return {
        body: { tasks: tasks[date], date }
    };
}

/**
 * Endpoint для обновления задачи.
 */
export async function put({ params, request }) {
    /**
     * Уникальный токен пользователя.
     */
    const token = params.token;

    /**
     * Дата в формате ISO из параметров запроса.
     */
    const date = getDateFromRequestParams(params);

    /**
     * Возвращаем 404 если в параметрах запроса передана неверная дата.
     */
    if (date === null) return { status: 404 };

    /**
     * Ожидаем получения тела запроса.
     */
    const body = await request.json();

    /**
     * Обновляем задачу.
     */
    tasks[date][body.id] = body.task;

    /**
     * Обновляем задачи на день в БД.
     */
    await setTasks(db, token, date, tasks[date]);

    /**
     * Возвращаем переадресацию на страницу,
     * с которой был совершен запрос.
     * 
     * Неодходимо для того, чтобы избавиться от параметра
     * _method в URL после выполнения запроса.
     */
    return {
        body: { tasks: tasks[date], date }
    };
}

/**
 * Endpoint для удаления задачи.
 */
export async function del({ params, request }) {
    /**
     * Уникальный токен пользователя.
     */
    const token = params.token;

    /**
     * Дата в формате ISO из параметров запроса.
     */
    const date = getDateFromRequestParams(params);

    /**
     * Возвращаем 404 если в параметрах запроса передана неверная дата.
     */
    if (date === null) return { status: 404 };

    /**
     * Ожидаем получения тела запроса.
     */
    const body = await request.json();

    /**
     * Удаляем задачу из сегодняшних задач.
     */
    tasks[date] = tasks[date].filter((task, id) => id !== body.id);

    /**
     * Обновляем задачи на день в БД.
     */
    await setTasks(db, token, date, tasks[date]);

    /**
     * Возвращаем задачи на дату и саму дату.
     */
    return {
        body: { tasks: tasks[date], date }
    };
}
