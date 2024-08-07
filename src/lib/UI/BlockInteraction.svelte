<script>
	export let block = false
</script>

{#if block}
<div class="absolute top-0 left-0 right-0 bottom-0 z-index-[9999999]">
	<slot />
</div>
{/if}