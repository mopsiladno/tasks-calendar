<script>
    import Calendar from "$lib/Calendar.svelte";
    import Scheduler from "$lib/Scheduler.svelte";

    /**
     * Текущая дата, в формате ISO.
     */
    export let date;

    /**
     * Задачи на текущую дату.
     */
    export let tasks;
</script>

<Calendar selectedIsoDate={date} />
<Scheduler {tasks} />
