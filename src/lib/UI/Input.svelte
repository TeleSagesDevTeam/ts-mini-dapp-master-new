<script>
	// import { Pinch, SetPriceTextArea } from "$lib/icons";

	export let showIncreasingButton = false
	export let value = 400
</script>

<div class="flex overflow-hidden">
	<div
		class="flex flex-1 justify-between col-span-7 items-center border rounded-xl dark:border-[#4E4E4ECC] border-[#9AA3AB] px-[9px]"
	>
		<div class="flex flex-1">
			<div class="flex items-center justify-center mr-[10px]">
				<!-- {@html SetPriceTextArea} -->
			</div>

			<input
				type="number"
				class="flex-1 font-medium bg-transparent outline-none text-menu h-14"
				bind:value
			/>
		</div>

		<div class="font-medium text-light-text text-menu">ETH</div>
	</div>

	{#if showIncreasingButton}
		<div
			class="flex ml-[15px] col-span-5 items-center justify-center border rounded-xl dark:border-[#4E4E4ECC] border-[#9AA3AB] px-[9px]"
		>
			<div class="flex items-center justify-center mr-[10px]">
				<!-- {@html Pinch} -->
			</div>

			<div class="font-medium text-light-text text-menu">increasing</div>
		</div>
	{/if}
</div>
