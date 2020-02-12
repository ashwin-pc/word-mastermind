<script>
    export let show
    export let word
</script>

<div class={show ? 'show' : ''}>
    <img src="images/win.webp" alt="">
    <h1>You broke the code!</h1>
    <h2>{word}</h2>
</div>

<style>
    div {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: var(--color5);
        transform: translateY(100%);
        transition: transform 0.3s 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);
    }

    div.show {
        transform: translate(0);
    }

    h2 {
        text-transform: uppercase;
    }

    img {
        max-width: 400px;
        width: 100%;
        max-height: 50%;
        object-fit: contain;
    }
</style>