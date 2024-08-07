<script>
	import { PUBLIC_SCANNER_URL, PUBLIC_BOT_URL } from '$env/static/public'
	import { onMount, onDestroy } from 'svelte'
	import { postAction } from '$lib/helper.js'

	import Invite from './Invite.svelte'
	import Button from '$UI/Button.svelte'
	import Loading from '$UI/Loading.svelte'
	import { TelegramIcon } from '$Icons/'
	
	export let hash
	export let name
	export let supply

	const refreshState = async () => {
		const response = await postAction(`/buy/success?tx=${hash}`)
		console.log(response)

		if(response.invites && response.invites.length) {
			invites = [...response.invites]
			clearInterval(intervalID)
		}
	}

	let invites = []
	let intervalID = setInterval(refreshState, 3500)

	onDestroy(() => { clearInterval(intervalID) })
</script>

<div class="flex flex-col items-center justify-center mt-6 text-center">
	{#if invites.length}
		<h1 class="font-medium text-intro-title mb-md">Success!</h1>
		
		<div class="w-full border dark:border-[#202224] border-[#DDD] border-x-0">
			<div class="flex items-center gap-3 my-3">
				<img
					src="/default_gathering_1.webp"
					class="h-[60px] w-[60px] rounded-full"
					alt=""
				/>
		
				<div class="flex-1 text-left">
					<h1 class="text-base font-medium leading-none">{name}</h1>
					<p class="font-medium text-btn text-dark-text text-sm">{supply} {supply > 1 ? 'members' : 'member'}</p>
				</div>
			</div>
		</div>
		
		<h2 class="mt-5 mb-3 font-medium">Your keys:</h2>
		
		<div class="space-y-[18px] w-full">
			{#each invites as invite, index}
				<Invite number={index+1} {...invite} />
			{/each}
			
			{#if invites.length > 3}
				<div class="pb-20"></div>
			{/if}
		</div>
		
		<div class="fixed left-0 bottom-0 w-full p-3 backdrop-blur-sm">
			<Button
				class="left-0 block w-full text-base bottom-2"
				link={PUBLIC_BOT_URL}/dashboard
			>
				<TelegramIcon />
				<span class="ml-2">Back to dashboard</span>
			</Button>
		</div>
	{:else}
		<h1 class="font-medium text-intro-title mb-md">Transaction registered</h1>

		<p class="text-base font-medium text-white/80 max-w-5/6 mb-3">Transaction hash:<br>
			<a class="underline" style:word-break=break-all target="_blank" href="{PUBLIC_SCANNER_URL}/tx/{hash}">{hash}</a>
		</p>
		<p class="text-base font-medium text-white/80 max-w-5/6">Please wait few seconds until we verify transaction on blockchain and generate your access keys.</p>

		<Loading />
	{/if}
</div>