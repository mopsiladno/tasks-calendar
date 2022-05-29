<script>
    /**
     * Задачи на текущую дату.
     */
    export let tasks;
</script>

<div>
    <form method="post">
        <input type="text" name="title" />
        <button type="submit">Добавить</button>
    </form>
    {#if tasks}
        <ul>
            {#each tasks as task}
                <li>{task.title}</li>
            {/each}
        </ul>
    {/if}
</div>
