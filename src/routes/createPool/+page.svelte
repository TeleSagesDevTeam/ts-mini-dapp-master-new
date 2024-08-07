<script>
	import { readContract, writeContract, waitForTransactionReceipt } from '@wagmi/core'
	import { onDestroy, onMount } from 'svelte'
	import { config, walletAddress as signerAddress } from '$lib/wagmi.js'
	import { hideGradient, hideBottomMenu, theme } from '$Stores/ui.js'
	import ChartBuilder from '$CreatePool/ChartBuilder.svelte'
	import Button from '$UI/Button.svelte'
	import Loading from '$UI/Loading.svelte'
	import Success from '$lib/Components/Success.svelte'
	import SageIcon from '$Icons/Sage.svelte'
	import TelegramIcon from '$Icons/Telegram.svelte'
	import { TSabi } from '$lib/TeleSagesKeysV1.js'
	import { etherToWei, replacer, truncateAddr } from '$lib/helper.js'
	import { PUBLIC_CONTRACT_ADDRESS, PUBLIC_SCANNER_URL } from '$env/static/public'

	export let data

	let error
	let priceCurve = 2
	let flatPriceParam = etherToWei(0.01)
	let multiPriceParam = etherToWei(0.01)
	let creating
	let result

	const handleUpdate = ({ detail }) => {
		priceCurve = detail.priceCurve
		flatPriceParam = detail.flatPriceParam
		multiPriceParam = detail.multiPriceParam
	}
	const createPool = async () => {
		try {
			creating = true
			const hash = await writeContract(config, {
				address: PUBLIC_CONTRACT_ADDRESS,
				abi: TSabi,
				functionName: 'createPool',
				args: [poolIndex, priceCurve, multiPriceParam, flatPriceParam]
			})
			result = await waitForTransactionReceipt(config, {
				hash,
				confirmations: 2,
				timeout: 30_000
			})
			console.log(result)

			creating = false
			// await monitorEvents()
			// mam tx hash, to moze realtime listen to Events and update UI when tx confirmed or in db?
		} catch(err) {
			console.log(err)
			if(!err?.details?.includes('User denied transaction signature.')) error = err
			creating = false
		}
	}

	onMount(async () => {
		$hideGradient = true
		$hideBottomMenu = true
		
		try {
			const test = await readContract({
				address: PUBLIC_CONTRACT_ADDRESS,
				abi: TSabi,
				functionName: 'getBalance',
				args: [walletAddress, walletAddress, poolIndex]
			})
			if(test) error = 'pool already exists'
		} catch(err) {
			console.log(err)
		}
	})

	onDestroy(() => {
		$hideGradient = false
		$hideBottomMenu = false
		// $hideBottomSpace = false
	})

	$: ({ walletAddress, poolIndex } = data)
</script>

{#if creating}
	<div class="fixed top-0 left-0 right-0 bottom-0 z-[999999]">
		<Loading text="waiting for wallet" />
	</div>
{/if}

<div class="relative z-[99999]" class:blur-[9px]={creating}>
	{#if !walletAddress || walletAddress !== $signerAddress}
		<h1 class="text-2xl font-medium mt-6 mb-3 text-center">Wrong wallet address</h1>
		<p>You have signed up to TeleSages with: {truncateAddr(walletAddress)}</p>
		<p>but you are connected with: {truncateAddr($signerAddress)}</p>
		<p>please switch your wallet to continue, if you feel this is a mistake please contact us on <a class="text-primary underline" href="https://t.me/Telesage">telegram</a></p>
	{:else}
		{#if !error}
			{#if !result}
				<h1 class="font-medium text-center text-intro-title my-md">Setup gathering pricing</h1>
		
				<ChartBuilder on:update={handleUpdate} />
		
				<div class="flex w-full pr-8 mb-5 z-[100]">
					<Button class="flex-1 ml-2 text-base"
						on:click={createPool}
						disabled={creating}
					>
						<SageIcon />
						<span class="ml-2">Create</span>
					</Button>
				</div>
			{:else}
				{#if result.status === 'success'}
					<Success>
						<p class="text-base text-center font-medium text-light-text break-words max-w-screen"><span class="text-white">transaction hash:</span> <a href="{PUBLIC_SCANNER_URL}/tx/{result.transactionHash}">{result.transactionHash}</a></p>
					</Success>

					<div class="fixed flex w-full pr-8 bottom-5 z-[100]">
						<a href="test" class="flex-1 text-btn p-btn ml-2 text-base bg-primary hover:bg-primary/90 active:bg-primary/80 text-white dark:bg-primary dark:hover:bg-primary-hover dark:active:bg-primary-active'} flex items-center justify-center rounded-btn">
							<TelegramIcon />
							<span class="block ml-2">Back to Telegram</span>
						</a>
					</div>
				{:else}
					<p>OOps something went wrong</p>
					<pre>{JSON.stringify(result, replacer, 2)}</pre>
		
					<Button class="flex-1 ml-2 text-base"
						on:click={createPool}
						disabled={creating}
					>
						<SageIcon />
						<span class="ml-2">Back to telegram</span>
					</Button>
				{/if}
			{/if}
		{:else}
			<h1 style="color:red">Error has occured:</h1>
			<pre class="whitespace-pre-wrap">{JSON.stringify(error, replacer, 2)}</pre>
		{/if}
	{/if}
</div>