<script>
    import { decrypt } from 'modules/crypt'
    import { getApiEndpoint } from 'modules/utils.js'

    import { validate } from '/modules/validate.js'
    import { decodeOnlineResult, decodeOfflineResult } from '/modules/decode.js'
    import { didTheyWin } from '/modules/didTheyWin.js'

    import Input from 'components/Input.svelte'

    import Cell from '/components/Cell.svelte'
    import Card from '/components/Card.svelte'
    import WinScreen from '/components/WinScreen.svelte'

    export let length = 0
    export let game

    let { online, code, iv } = game

    let value = ''
    let letters = new Array(parseInt(length))
    let history = []
    let error = ''
    let theyWon = false

    // Clears Error when value changes
    $: error = value.length < 0  && null

    async function handleTest() {
        const [valid, _error] = validate(value, length)
        if (!valid) {
            error = _error
            return
        }

        if (online) {
            const response = await fetch(`${getApiEndpoint()}api.php?testWord=${value}&codeWord=${code}&iv=${iv}&action=test`)
            const result = await response.text()
            letters = decodeOnlineResult(result, letters)
        } else {
            letters = decodeOfflineResult(value.toLowerCase(), decrypt(code))
        }
        
        // Animte history
        const len = 5
        const timeout = history.length >= len ? 500 : 0
        history = [...history.slice(Math.max(history.length - len + 1, 0))]
        setTimeout(() => history = [...history, [value, [...letters]]], timeout)

        theyWon = didTheyWin(letters, length, 'correct')
    }
</script>

<main>
    <div class="letter-container">
        <div class="row">
        {#each letters as state, i}
            <Cell {state} />
        {/each}
        </div>

    {#each history as [testWord, result], historyIndex}
        <Card word={testWord} {result} />
    {/each}
    </div>

    <div class="input-container">
        {#if error}
            <label for="word">{error}</label>
        {/if}
        <Input bind:value={value} placeholder="Enter the code!" name="word" onEnter={handleTest} />
    </div>

    <WinScreen show={theyWon} word={value} />
</main>

<style>
    main {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .letter-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        flex: 1;
        width: 100%;
        padding: 10px;
        padding-top: 100px;
    }

    .letter-container > .row {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        justify-content: center;
        width: 90vw;
        max-width: 400px;
    }

    .input-container :global(.input-ref) {
        font-size: 1.2rem;
        padding: 10px 20px;
        text-transform: uppercase;
        margin: 0;
    }

    label {
        color: var(--color5)
    }
</style>