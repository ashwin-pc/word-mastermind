<script>
    import Input from 'components/Input.svelte'
    import { encrypt, decrypt } from 'modules/crypt.js'

    import { generateURL } from './modules/generateURL.js'

    let url
    let error
    let codeWord = ''
    let online = true

    async function handleGenerate (e, ele) {
        const [_url, _error] = await generateURL(codeWord, online)
        url = _url
        error = _error
        
        if (_error) {
            return
        }

        ele && ele.blur()
    }

    // Clears url when value changes
    $: url = codeWord.length < 0

    function valid(codeWord) {
        if (codeWord == '' || codeWord == null) {
            return false
        }

        return true
    }
</script>

<main>
    <div>
        <Input bind:value={codeWord} placeholder="Enter code.." name="word" autofocus onEnter={handleGenerate} />
        {#if error}
            <label>{error}</label>
        {/if}
    </div>
    {#if url}
        <a href={url}>Start the game</a>
    {:else}
        <span on:click={handleGenerate}>Generate code</span>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        max-width: 600px;
        margin: auto;
        height: 100vh;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        padding: 30px;
    }

    label {
        color: var(--color5);
    }

    a, span {
        display: block;
        font-weight: bold;
        padding: 40px;
        font-size: 2rem;
        text-transform: uppercase;
        text-align: center;
    }

    span {
        color: white;
        background: var(--color3);
    }

    a {
        color: white;
        background: var(--color5);
    }
</style>