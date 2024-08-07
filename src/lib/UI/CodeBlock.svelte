<script>
	import { CopyIcon } from '$Icons/'
	import Button from '$UI/Button.svelte'

	export let code = ''
	export let showCopyButton

	let copied

	let lines = code.split('\n')
	let lineNumbers = lines.map((_, index) => (index + 1).toString().padStart(2, '0'))
</script>

<div
	class="dark:bg-[rgba(255,255,255,0.05)] bg-[#F5F8FB] w-full rounded-[10px] overflow-hidden text-btn"
>
	{#each lines as line, index}
		{@const isFirst = index === 0}
		{@const isLast = index === lines.length - 1}

		<div class="flex leading-[181%]">
			<div
				class="mr-2 dark:text-white/30 text-[#141414]/30 dark:font-normal font-semibold w-[30px] min-w-[30px] text-left px-[6px] bg-white/5 {isFirst
					? 'pt-[11px]'
					: ''} {isLast ? 'pb-[10px]' : ''}"
			>
				{lineNumbers[index]}
			</div>
			<div
				class="flex-1 break-words dark:text-inherit text-[#141414] dark:font-normal font-semibold {isFirst ? 'pt-[11px]' : ''} {isLast
					? 'pb-[10px]'
					: ''}"
				class:ml-3={!isFirst && !isLast}
			>
				{line}
			</div>
		</div>
	{/each}
</div>

{#if showCopyButton}
	<div class="flex mt-2">
		<Button
			class="flex-1"
			on:click={() => {
				try {
					navigator.clipboard.writeText(code);
					copied = true;

					setTimeout(() => {
						copied = false;
					}, 1000);
				} catch (error) {
					console.error(error);
				}
			}}
			outline
		>
			<CopyIcon />
			<span class="ml-2"> {copied ? "Copied" : "Copy Code"}</span>
		</Button>
	</div>
{/if}