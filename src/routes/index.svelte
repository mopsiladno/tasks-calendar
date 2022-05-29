<script>
    import projectNameGenerator from "project-name-generator";

    /**
     * Случайный уникальный URL.
     */
    const randomUrl = projectNameGenerator.generate({
        words: 4,
        number: true,
    }).dashed;
</script>

<h1>Добро пожаловать!</h1>
<p>
    Ссылка на ваш личный календарь:<br />
    <a href={randomUrl}>{randomUrl}</a>
</p>
