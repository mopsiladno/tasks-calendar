/**
 * Массив задач на запрошенную дату.
 */
const tasks = [];

/**
 * Пример задачи на запрашиваемую дату.
 */
const defaultTask = { title: 'Пример задачи' };

/**
 * Добавляем пример задачи в массив задач.
 */
// tasks.push(defaultTask);

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

export async function get({ params }) {
    /**
     * Дата в формате ISO из параметров запроса.
     */
    const date = getDateFromRequestParams(params);

    /**
     * Возвращаем 404 если в параметрах запроса передана неверная дата.
     */
    if (date === null) return { status: 404 };

    /**
     * Возвращаем запрашиваемую дату и задачи на эту дату.
     */
    return {
        body: { tasks: tasks[date], date }
    };
}

export async function post({ params, request }) {
    /**
     * Дата в формате ISO из параметров запроса.
     */
    const date = getDateFromRequestParams(params);

    /**
     * Возвращаем 404 если в параметрах запроса передана неверная дата.
     */
    if (date === null) return { status: 404 };

    /**
     * Ожидаем получения тела запроса (данных формы).
     */
    const body = await request.formData();

    if (!tasks[date]) tasks[date] = [];

    tasks[date].push({ title: body.get('title') });

    return {
        body: { tasks: tasks[date], date }
    };
}
