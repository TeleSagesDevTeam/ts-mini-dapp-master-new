<script>
	let classes = "";

	export let isIcon = false
	export let muted = false
	export let link

	export { classes as class }
</script>

{#if link}
	<a href={link} target=_blank
		class="font-semibold transition-all active:scale-[0.95] {muted
			? 'bg-btn-muted hover:bg-btn-muted-hover'
			: 'bg-primary hover:bg-primary-hover'} flex items-center justify-center rounded-btn {isIcon
			? ''
			: 'text-btn p-btn'} {classes}"
	>
		<slot />
	</a>
{:else}
	<button
		class="font-semibold transition-all active:scale-[0.95] {muted
			? 'bg-btn-muted hover:bg-btn-muted-hover'
			: 'bg-primary hover:bg-primary-hover'} flex items-center justify-center rounded-btn {isIcon
			? ''
			: 'text-btn p-btn'} {classes}"
		on:click
	>
		<slot />
	</button>
{/if}