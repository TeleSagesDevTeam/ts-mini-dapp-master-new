<script>
	import { CopyCode } from '$Icons/'
	import Button from '$UI/Button.svelte'

	export let code = ''

	let copied
</script>

<div
	class="dark:bg-[rgba(255,255,255,0.05)] bg-[#F5F8FB] w-full rounded-[10px] overflow-hidden text-btn"
>
    <div class="flex leading-[181%]">
        <div
            class="flex-1 break-words dark:text-inherit text-[#141414] dark:font-normal font-semibold"
        >
            {code}
        </div>
    </div>
</div>


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
			<CopyCode />
			<span class="ml-2"> {copied ? "Copied" : "Copy Code"}</span>
		</Button>
	</div>
