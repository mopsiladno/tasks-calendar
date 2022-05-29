<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let task = {
        title: "",
        done: false,
    };

    function addTask() {
        fetch("", {
            method: "POST",
            body: JSON.stringify({ task }),
            headers: {
                Accept: "application/json",
            },
        }).then((response) => {
            response.json().then((body) => {
                dispatch("taskAdd", body);
                task = {
                    title: "",
                    done: false,
                };
            });
        });
    }
</script>

<form on:submit|preventDefault={addTask}>
    <input
        type="text"
        placeholder="Добавить задачу..."
        required
        bind:value={task.title}
    />
    <button type="submit">Добавить</button>
</form>

<style>
    form {
        display: flex;
        margin: 20px 0;
    }

    input {
        border: 1px solid gray;
        border-radius: 20px 0 0 20px;
        flex: auto;
        padding: 9px 20px;
    }

    button {
        background: #589c5f;
        border: 0;
        border-radius: 0 20px 20px 0;
        color: white;
        padding: 10px;
        width: 100px;
    }
</style>
