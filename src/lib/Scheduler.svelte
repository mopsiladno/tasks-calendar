<script>
    /**
     * Задачи на текущую дату.
     */
    export let tasks;
</script>

<div>
    <ul>
        {#each tasks as task}
            <li>{task.title}</li>
        {/each}
    </ul>
</div>
