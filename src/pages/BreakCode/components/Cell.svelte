<script>
    export let state = '';
    export let size = 'main';
</script>

<div class="box {size}">
    <div class="fill {state}"></div>
</div>

<style>
    .box {
        padding: 3px;
        width: 100%;
        max-width: 60px;
    }

    .box.main {
        padding: 20px 3px;
    }

    .fill {
        background: linear-gradient(0deg, #a2a2a2, #cccccc);
        border-radius: 3px;
    }

    .main > .fill {
        height: 60px;
        box-shadow: 0px 5px 7px #0000006e;
    }

    .small > .fill {
        height: 20px;
    }

    .fill.correct {
        background: linear-gradient(0deg, #8BC34A, #CDDC39);
    }

    .fill.partial {
        background: linear-gradient(0deg, #e8e8e8, #ffffff);
    }
</style>