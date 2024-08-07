<script>
	import Button from '$UI/Button.svelte'

	export let selected
	export let link
	export let status
    export let created
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex items-center gap-3 p-1 mb-1 cursor-pointer {selected ? 'bg-white/5 rounded' : ''}" on:click>
	<div class="flex flex-col flex-1 gap-1">
		<h1 class="text-base font-medium text-white/80">{link}</h1>
		<div class="flex items-center gap-3">
			<p class="text-sm text-btn text-dark-text {status} py-1 px-2 flex-shrink-0">{status}</p>
			<p class="text-xs text-white/40">purchased:<br><span class="text-white/50">{created}</span></p>
		</div>
	</div>

	<Button
		class="{selected
			? ''
			: 'bg-primary-light/20 dark:bg-primary/20 dark:!text-primary !text-primary-light hover:bg-primary-light/30 active:bg-primary-light/40 dark:hover:bg-primary-hover/20 dark:active:bg-primary-active/20'} backdrop-blur-lg px-6 font-semibold text-menu max-w-[93px]"
		removeDefaultClasses={!selected}
	>
		{#if selected}
			Selected
		{:else}
			Select
		{/if}
	</Button>
</div>

<style>
	.used {
		background: #4d411e;
		color: #fec005;
		border: 1px solid #fec005dd;
		border-radius: 6px;
	}
	.unused {
		background: #103821;
		color: #00c853;
		border: 1px solid #00c853dd;
		border-radius: 6px;
	}
</style>