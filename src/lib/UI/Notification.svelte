<script>
	import { WarningIcon, SuccessIcon, ErrorIcon } from '$Icons/'

	export let type
	export let title
	export let description
	let classes = ''

	export { classes as class }
</script>

<div
	class="rounded-btn dark:bg-[#14141499] bg-[#F5F8FB] backdrop-filter backdrop-blur-lg p-[14px] w-full flex {classes}"
>
	<div class="pr-4">
		{#if type === 'error'}<ErrorIcon />{/if}
		{#if type === 'success'}<SuccessIcon />{/if}
		{#if type === 'warning'}<WarningIcon />{/if}
	</div>

	<div class="flex flex-col items-start justify-center text-base font-medium text-left dark:font-normal">
		<h1 class="leading-[140%]">{title}</h1>

		<p class="text-xs font-medium text-light-text">{description}</p>
	</div>
</div>
