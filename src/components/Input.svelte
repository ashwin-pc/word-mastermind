<script>
    export let name
    export let placeholder = ''
    export let value = ''
    export let autofocus = false
    export let onEnter

    let inputElement;

    function handleEnter (event) {
        if (event.keyCode === 13) {

            if (onEnter) {
                onEnter(event, inputElement)
            }
        }
    }
</script>

<!-- svelte-ignore a11y-autofocus -->
<input type="text" bind:value={value} class="input-ref" name={name} placeholder={placeholder} autofocus={autofocus} on:keyup|preventDefault={handleEnter} bind:this={inputElement}/>


<style>
    input {
        font-size: 3rem
    }
</style>