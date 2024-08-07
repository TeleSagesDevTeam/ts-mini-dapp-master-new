<script>
	import {fade, slide, fly} from 'svelte/transition'
	import { BookmarkIcon, CopyIcon, ShareIcon } from '$Icons/'
	import Button from '$UI/Button.svelte'

	export let number = 1
	export let link = 'https://t.me/ai_banner'

	let copied

	const copyLink = () => {
		navigator.clipboard.writeText(link)
		copied = true

		setTimeout(() => {
			copied = false
		}, 1500)
	}
</script>

<div class="flex items-center dark:bg-[#202224] bg-[#F0F0F0] px-[9px] py-[6px] gap-[7px] text-menu rounded-menu relative">
	<span class="w-[15px] text-right dark:text-white text-light-text">
		{number.toString().padStart(2, "0")}
	</span>

	<span class="flex-1 font-medium text-black dark:text-light-text text-left">
		{link}
	</span>

	{#if copied}
		<div
			transition:fade
			class="absolute bg-black text-white rounded-menu transition-opacity z-10 toast"
		>Copied!</div>
	{/if}


	<div class="flex gap-1">
		<Button
			class="dark:!bg-[#4E4E4ECC] dark:hover:!bg-[#4E4E4ECC]/60 bg-white dark:!text-white !text-primary-light hover:!bg-primary-light/30 w-10 h-10 [&>*]:w-6 [&>*]:h-6 p-0"
			isIcon muted
			on:click={() => copyLink()}
		>
			<CopyIcon />
		</Button>

		{#if navigator.share}
			<Button
				class="dark:!bg-[#4E4E4ECC] dark:hover:!bg-[#4E4E4ECC]/60 bg-white dark:!text-white !text-primary-light hover:!bg-primary-light/30 w-10 h-10 [&>*]:w-6 [&>*]:h-6 p-0"
				isIcon muted
				on:click={() => navigator.share({ url: link }) }
			>
				<ShareIcon />
			</Button>
		{/if}
	</div>
</div>

<Button
	class="bg-primary-light/20 dark:bg-primary/20 dark:!text-primary !text-primary-light hover:bg-primary-light/30 active:bg-primary-light/40 dark:hover:!bg-primary-hover/20 dark:active:bg-primary-active/20 backdrop-blur-lg px-6 font-semibold text-menu w-full [&>*]:fill-current !mt-1 brightness-110"
	{link}
>
	<BookmarkIcon /> <span class="ml-[6px]">Use Invite</span>
</Button>

<style>
	.toast {
		bottom: 0;
		left: 0;
		transition-duration: 500ms;
		margin: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 12px;
	}
</style>