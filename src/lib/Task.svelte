<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let task;
    export let id;

    function updateTask() {
        fetch("", {
            method: "PUT",
            body: JSON.stringify({ id, task }),
            headers: {
                Accept: "application/json",
            },
        }).then((response) => {
            response.json().then((body) => {
                dispatch("taskUpdate", body);
            });
        });
    }

    function deleteTask() {
        fetch("", {
            method: "DELETE",
            body: JSON.stringify({ id }),
            headers: {
                Accept: "application/json",
            },
        }).then((response) => {
            response.json().then((body) => {
                dispatch("taskUpdate", body);
            });
        });
    }
</script>

<tr>
    <td style="width: 20px;">
        <input
            type="checkbox"
            bind:checked={task.done}
            on:change={updateTask}
        />
    </td>
    <td
        style="padding: 10px;"
        class:done={task.done}
        contenteditable
        bind:textContent={task.title}
        on:blur={updateTask}
    />
    <td class="remove" on:click={deleteTask} style="width: 20px;">&cross;</td>
</tr>

<style>
    tr {
        margin: 10px 0;
    }

    .remove {
        color: red;
        cursor: pointer;
        text-align: right;
    }

    .done {
        text-decoration: line-through;
        color: darkgray;
    }
</style>
