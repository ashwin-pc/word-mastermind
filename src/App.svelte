<script>
	import CreateCode from 'pages/CreateCode/index.svelte'
	import BreakCode from 'pages/BreakCode/index.svelte'

	let { length, game } = init()

	function init() {
		const queryString = location.search;
		const urlParams = new URLSearchParams(queryString);
		const online = urlParams.get('online')
		const length = urlParams.get('l')
		let game = null

		if (online === 'true') {
			const [code, iv] = (urlParams.get('game') || '').split(',')
			game = {
				online: true,
				code,
				iv,
			}
		} else if (online === 'false') {
			game = {
				online: false,
				code: urlParams.get('game')
			}
		}

		return {
			length,
			game,
		}
	}
</script>

{#if !length}
	<CreateCode />
{:else}
	<BreakCode {length} {game} />
{/if}
