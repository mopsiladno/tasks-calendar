<script>
    import { iso } from "$lib/functions.js";

    /**
     * Выбранная дата, в формате ISO ('yyyy-mm-dd').
     */
    export let selectedIsoDate;

    /**
     * Названия дней недели.
     */
    let weekDaysNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    /**
     * Первый день недели.
     * 0 = Воскресенье, 1 = Понедельник
     */
    let firstDayOfWeek = 1;

    /**
     * Смещение в количестве месяцев от выбранной даты.
     */
    let offset = 0;

    /**
     * Обновить дату для отображения при выбранной даты или
     * изменении смещения в количестве месяцев от выбранной даты.
     */
    $: viewDate = viewDateFrom(selectedIsoDate, offset);

    /**
     * Обновить текущий месяц при изменении даты для отображения.
     */
    $: currentMonth = viewDate.getMonth();

    /**
     * Обновить название текущего месяца при изменении даты для отображения.
     */
    $: monthName = viewDate.toLocaleDateString("ru", { month: "long" });

    /**
     * Обновить текущий год при изменении даты для отображения.
     */
    $: year = viewDate.getFullYear();

    /**
     * Обновить массив недель для отображения
     * при изменении даты для отображения.
     */
    $: weeks = weeksFrom(viewDate);

    /**
     * Метод для получения даты для отображения.
     *
     * @param isoDate дата для отображения, в формате ISO
     * @param offset смещение от текущей даты (в количестве месяцев)
     */
    function viewDateFrom(isoDate, offset) {
        /**
         * Дата для отображения.
         */
        const viewDate = new Date(isoDate);

        /**
         * Изменяем месяц даты для отображения на смещение от текущей даты.
         */
        viewDate.setMonth(viewDate.getMonth() + offset);

        /**
         * Возвращаем дату для отображения.
         */
        return viewDate;
    }

    /**
     * Метод для получения массива недель для отображения.
     *
     * @param viewDate дата для отображения
     */
    function weeksFrom(viewDate) {
        /**
         * Первая дата для отображения.
         * Устанавливаем текущую дату в качестве первой даты для отображения.
         */
        const firstDate = new Date(viewDate.getTime());

        /**
         * Устанавливаем первый день текущего месяца
         * в качестве первой даты для отображения.
         */
        firstDate.setDate(1);

        /**
         * Устанавливаем правильное число
         * в качестве первой даты для отображения.
         *
         * Если первое число месяца - не понедельник, то устанавливаем
         * дату первого дня последней недели предыдущего месяца.
         *
         * Для этого уменьшаем первую дату месяца на количество дней
         * до первого дня последней недели предыдущего месяца.
         *
         * Вычитаем из первого дня недели день недели первой даты и ещё 7 дней.
         * Получаем остаток от деления результата на 7 дней.
         * Получится отрицательное количество дней,
         * которое необходимо добавить к текущей дате.
         */
        firstDate.setDate(
            firstDate.getDate() +
                ((firstDayOfWeek - firstDate.getDay() - 7) % 7)
        );

        /**
         * Последняя дата для отображения.
         * Устанавливаем текущую дату в качестве первой даты для отображения.
         */
        const lastDate = new Date(viewDate.getTime());

        /**
         * Устанавливаем последнй день текущего месяца
         * в качестве последней даты для отображения.
         */
        lastDate.setDate(
            new Date(
                viewDate.getFullYear(),
                viewDate.getMonth() + 1,
                0
            ).getDate()
        );

        /**
         * Устанавливаем правильное число
         * в качестве последней даты для отображения.
         *
         * По аналогии с первой датой для отображения.
         */
        lastDate.setDate(
            lastDate.getDate() + ((firstDayOfWeek - lastDate.getDay() + 6) % 7)
        );

        /**
         * Текущая дата.
         */
        const currentDate = new Date(firstDate.getTime());

        /**
         * Массив недель.
         */
        const weeks = [];

        /**
         * Неделя.
         */
        let week = [];

        /**
         * Перебираем дни пока текущая дата не меньше последней даты.
         */
        do {
            /**
             * Если текущий день - это первый день недели,
             * то начинаем добавлять в массив недель новую неделю.
             */
            if (currentDate.getDay() === firstDayOfWeek) {
                /**
                 * Обнуляем неделю.
                 */
                week = [];

                /**
                 * Добавляем неделю в массив недель.
                 */
                weeks.push(week);
            }

            /**
             * Число месяца.
             */
            const date = currentDate.getDate();

            /**
             * Номер месяца.
             * Отсчитывается от 0, где 0 - это январь.
             */
            const month = currentDate.getMonth();

            /**
             * Дата в формате ISO.
             */
            const isoDate = iso(currentDate);

            /**
             * Добавляем данные о дне в неделю:
             * - число месяца,
             * - номер месяца,
             * - дата в формате ISO.
             */
            week.push({ date, month, isoDate });

            /**
             * Увеличиваем текущую дату на 1 день.
             */
            currentDate.setDate(date + 1);
        } while (currentDate.getTime() <= lastDate.getTime());

        /**
         * Возвращаем массив недель из функции.
         */
        return weeks;
    }

    /**
     * Метод для отображения другого месяца.
     *
     * @param direction направление (на сколько месяцев увеличить смещение)
     */
    function go(direction) {
        offset = offset + direction;
    }

    /**
     * Метод для выбора (изменения) даты.
     *
     * @param isoDate дата, в формате ISO
     */
    function selectDate(isoDate) {
        /**
         * Изменяем текущую дату в формате ISO.
         */
        selectedIsoDate = isoDate;

        /**
         * Обнуляем смещение месяца.
         */
        offset = 0;
    }
</script>

<table>
    <tr>
        <td class="btn" style="font-size: 18pt;" on:click={() => go(-1)}
            >&lsaquo;</td
        >
        <td class="monthName" colspan="5">{monthName} {year}</td>
        <td class="btn" style="font-size: 18pt;" on:click={() => go(+1)}
            >&rsaquo;</td
        >
    </tr>
    <tr>
        {#each weekDaysNames as day}
            <th>{day}</th>
        {/each}
    </tr>
    {#each weeks as week}
        <tr>
            {#each week as day}
                <td>
                    <a
                        class="btn"
                        class:selected={day.isoDate === selectedIsoDate}
                        class:past={day.month < currentMonth}
                        class:future={day.month > currentMonth}
                        href={day.isoDate}
                    >
                        {day.date}
                    </a>
                </td>
            {/each}
        </tr>
    {/each}
</table>

<style>
    table {
        margin: 0 auto; /* центрировать горизонтально */
    }

    td,
    th {
        text-align: center;
        font-weight: normal;
        width: 50px;
        height: 50px;
    }

    a {
        text-decoration: none;
        color: inherit;
        display: block;
        padding: 1em;
    }

    a.past,
    a.future {
        color: lightgray;
    }

    a.selected {
        color: white;
        font-weight: bold;
        background-color: #fb3f4a;
    }

    .btn {
        border-radius: 100%;
        cursor: pointer;
    }

    .btn:hover {
        background: gray;
        color: white;
    }

    .monthName {
        text-transform: capitalize;
        font-weight: bold;
    }
</style>
