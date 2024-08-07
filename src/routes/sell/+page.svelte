<script>
	import { readContract, writeContract } from '@wagmi/core'
	import { onDestroy, onMount } from 'svelte'
	import { hideGradient, hideBottomMenu } from '$Stores/ui.js'
    import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public'
	import { MinusIcon, PlusIcon, SellIcon } from '$Icons/'
	import { config, walletAddress as signerAddress } from '$lib/wagmi.js'
	import { TSabi } from '$lib/TeleSagesKeysV1.js'
	import { truncateAddr, getPoolID } from '$lib/helper.js'

	import Button from '$UI/Button.svelte'
	import Loading from '$UI/Loading.svelte'
	import WalletInfo from '$Components/WalletInfo.svelte'
	import SellKeyItem from '$lib/Components/Keys/SellKeyItem.svelte'

	export let data

	let selected = {}
	let selektor
	let selling
	let success
	let error

	const selectAll = state => keys?.forEach(({ id }) => selected[id] = !!state)

	const getSellPrice = async _amount => {
		try {
			return await readContract(config, {
				address: PUBLIC_CONTRACT_ADDRESS,
				abi: TSabi,
				functionName: 'getSellPriceAfterFee',
				args: [gatheringWallet, poolIndex, _amount],
			})
		} catch(err) {
			console.log(err)
			error = err.shortMessage ?? JSON.stringify(err)
		}
	}
	
	const sellKeys = async () => {
		error = ''
		selling = true

		if(sellHowMany < 1) return error = 'Please select at least one key to sell.'

		try {
			const keyIdentifiers = Object.entries(selected).filter(([k,v]) => v).map(([k,v]) => k)
			const hash = await writeContract(config, {
				address: PUBLIC_CONTRACT_ADDRESS,
				abi: TSabi,
				functionName: 'sellKeys',
				args: [gatheringWallet, poolIndex, sellHowMany, keyIdentifiers]
			})

			success = hash
			selling = false
		} catch(err) {
			console.log(err)
			error = err.shortMessage ?? JSON.stringify(err)
		}

		const test = await getSellPrice(sellHowMany)
		console.log(test)
	}

	$: selectAll(selektor)
	$: sellHowMany = Object.entries(selected).filter(([k, v]) => v).length
	$: ({ walletAddress, name, keys, gatheringWallet, poolIndex, ETHUSD } = data)
</script>

{#if !walletAddress || walletAddress !== $signerAddress}
	<h1 class="text-2xl font-medium mt-6 mb-3 text-center">Wrong wallet address</h1>
	<p>You have signed up to TeleSages with: {truncateAddr(walletAddress)}</p>
	<p>but you are connected with: {truncateAddr($signerAddress)}</p>
	<p>please switch your wallet to continue, if you feel this is a mistake please contact us on <a class="text-primary underline" href="https://t.me/Telesage">telegram</a></p>
{:else}
	{#if selling}
		<div class="fixed top-0 left-0 right-0 bottom-0 grid place-items-center z-[999999] bg-[#00000069]">
			{#if !error}
				<Loading text="Transaction in process, wait for wallet..." />
			{:else}
				<div class="flex flex-col items-center gap-3">
					<p class="text-lg text-center">{error}</p>
					<div class="flex gap-3">
						<Button muted on:click={() => {error = '';selling = false; }}>Back</Button>
						<Button on:click={sellKeys}>Retry</Button>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	{#if !success}
		<div class="flex flex-col h-screen relative" class:blur-[16px]={selling}>
			<h1 class="mt-5 mb-3 text-3xl font-medium text-center">Sell Keys</h1>
		
			<WalletInfo />
		
			<!-- <div class="flex-1"></div> -->
		
			<div class="flex items-center justify-start gap-3">
				<img
					src="/default_gathering_1.webp" alt="gathering"
					class="w-20 h-20 rounded-full my-3"
				/>
				<div>
		
					<h2 class="font-medium text-[22px]">{name}</h2>
					<p class="mt-1 font-medium text-menu text-dark-text">supply</p>
				</div>
				<!-- {#await getCurrSupply()}
					--
				{:then supply} 
					{supply}
				{/await} -->
				
			</div>
		
			<!-- Invites List -->
			<div class="flex items-center justify-between">
				<h2 class="mt-6 mb-[13px] font-medium text-white">Choose keys you want sell:</h2>
		
				<div class="flex items-center gap-2">
					<label
						for="select-all"
						class="ml-2 font-medium text-dark-text select-none cursor-pointer"
					>Select All</label>
					<input bind:checked={selektor} type="checkbox" id="select-all" class="rounded text-indigo-600 focus:ring-indigo-500">
				</div>
			</div>
		
			<div class="overflow-auto">
				{#each keys as key}
					{@const id = key.id}
					<SellKeyItem
						{...key}
						selected={selected[key.id]}
						on:click={() => selected[key.id] = !selected[key.id]}
					/>
				{/each}
			</div>

			<div class="flex-1"></div>

			{#if sellHowMany > 0}
				<div class="flex flex-col w-full">
					<div class="rounded-btn dark:bg-[#202224] bg-[#F5F8FB] text-center py-1">
						{#await getSellPrice(sellHowMany)}
							fetching price ...
						{:then weiPrice}
							{@const ethPrice = Number(weiPrice) / 1e18}
							<h1 class="text-[32px] font-medium">{ethPrice} <span class="text-[17px]">ETH</span></h1>
							<p class="font-medium text-light-text text-btn">current price = ${(Number(ethPrice) * ETHUSD).toFixed(2)}</p>
						{:catch}
							<p class="text-error">oops something went wrong</p>
						{/await}
					</div>
				</div>
			{/if}


			<div class="pb-3">
				<Button class="block w-full mt-3 text-base" on:click={sellKeys}>
					<SellIcon />	
					<span class="block ml-[10px]">Sell keys</span>
				</Button>
			</div>
		</div>

	{:else}
		SellSukkcess
	{/if}
{/if}