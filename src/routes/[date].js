export async function get({ params }) {
    /**
     * Дата в формате ISO из параметров запроса.
     */
    const date = params.date;

    /**
     * Регулярное выражение для поиска даты в формате ISO.
     */
    const dateRegex = /\d{4}-\d{2}-\d{2}/g;

    /**
     * Если дата в качестве параметра date
     * передана не дата в формате ISO.
     */
    if (!dateRegex.exec(date)) {
        return { status: 404 };
    }

    /**
     * Массив задач на запрошенную дату.
     */
    const tasks = [];

    /**
     * Пример задачи на запрашиваемую дату.
     */
    const defaultTask = { title: `Это задача на: ${date}` };

    /**
     * Добавляем пример задачи в массив задач.
     */
    tasks.push(defaultTask);

    /**
     * Возвращаем запрашиваемую дату и задачи на эту дату.
     */
    return {
        body: { tasks, date }
    };
}