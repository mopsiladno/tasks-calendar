<script>
    import Task from "$lib/Task.svelte";
    import TaskAdd from "$lib/TaskAdd.svelte";

    /**
     * Задачи на текущую дату.
     */
    export let tasks;

    /**
     * Метод для обновления текущих задач.
     */
    function handleTaskUpdate(event) {
        /**
         * Обновляем текущие задачи на задачи,
         * полученные из события.
         */
        tasks = event.detail.tasks;
    }
</script>

<div>
    <TaskAdd on:taskAdd={handleTaskUpdate} />

    <table>
        {#if tasks === undefined || tasks.length === 0}
            <p>Задачи не запланированы</p>
        {:else}
            <tbody>
                {#each tasks as task, id}
                    <Task {task} {id} on:taskUpdate={handleTaskUpdate} />
                {/each}
            </tbody>
        {/if}
    </table>
</div>

<style>
    table {
        width: 100%;
    }

    p {
        margin: 0;
    }
</style>
