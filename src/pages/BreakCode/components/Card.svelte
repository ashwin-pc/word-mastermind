<script>
    import Cell from 'Cell.svelte'
    export let result
    export let word
</script>

<div class="card-ref">
    <p>{word}</p>
    {#each result as state, index}
        <Cell {state} size="small" />
    {/each}
</div>

<style>
    div {
        display: flex;
        font-family: 'Share Tech Mono', monospace;
        max-width: 400px;
        background: var(--color2);
        border-radius: 3px;
        padding: 10px;
        width: 90vw;
        margin-bottom: 5px;
        box-shadow: 0px 3px 9px #00000063;
        animation: flip 0.2s ease 0s forwards;
    }

    p {
        flex: 1;
        text-align: center;
        margin: 0;
        margin-right: 5px;
        align-self: center;
        text-transform: uppercase;
    }

    @keyframes flip {
        0% {
            transform: rotateX(90deg)
        }

        100% {
            transform: rotateX(0)
        }
    }
</style>