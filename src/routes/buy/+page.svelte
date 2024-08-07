<script>
	import { readContract, writeContract } from '@wagmi/core'
	import { onDestroy, onMount } from 'svelte'
	import { dev } from '$app/environment'
	import { hideGradient, hideBottomMenu } from '$Stores/ui.js'
    import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public'
	import { MinusIcon, PlusIcon, SellIcon } from '$Icons/'
	import { config, walletAddress as signerAddress } from '$lib/wagmi.js'
	import { TSabi } from '$lib/TeleSagesKeysV1.js'
	import { truncateAddr, getPoolID } from '$lib/helper.js'
	import WalletInfo from '$Components/WalletInfo.svelte'
	import Button from '$UI/Button.svelte'
	import Loading from '$UI/Loading.svelte'
	import Notification from '$UI/Notification.svelte'
	import BuySuccess from '$Components/Keys/Success.svelte'

	export let data

	let amount = 1
	let buying
	let error = ''
	let success = ''

	let priceFetchTimeout
	let lastRequestedAmount = null

	const getKeysPrice = async (_amount, bypass) => {
		if(priceFetchTimeout) clearTimeout(priceFetchTimeout)

		return new Promise((resolve, reject) => {
			priceFetchTimeout = setTimeout(async () => {
				if(_amount !== lastRequestedAmount || bypass) {
					lastRequestedAmount = _amount
					try {
						const currentPriceWithFees = await readContract(config, {
							address: PUBLIC_CONTRACT_ADDRESS,
							abi: TSabi,
							functionName: 'getBuyPriceAfterFee',
							args: [gatheringWallet, dev ? 1 : poolIndex, _amount],
						})

						resolve(currentPriceWithFees)
					} catch(err) {
						console.log(err)
						error = err.shortMessage
						reject(err)
					}
				}
			}, 300)
		})
	}


	const getCurrSupply = async () => {
		const [owner, priceCurve, multiParam, flatParam, supply] = await readContract(config, {
			address: PUBLIC_CONTRACT_ADDRESS,
			abi: TSabi,
			functionName: 'pools',
			args: [getPoolID(gatheringWallet, dev ? 1 : poolIndex)],
		})
		
		return supply
	}
	const buyKeys = async () => {
		try {
			error = ''
			buying = true

			const hash = await writeContract(config, {
				address: PUBLIC_CONTRACT_ADDRESS,
				abi: TSabi,
				functionName: 'buyKeys',
				args: [gatheringWallet, dev ? 1 : poolIndex, amount],
				// value: 12
				value: await getKeysPrice(amount, true)
			})
			success = hash
		
			buying = false
		} catch(err) {
			if(err?.shortMessage?.includes('Insufficient payment')) return error = 'Key price changed, try again...'
			console.log(err)
			error = err.shortMessage
			//TODO: sentry 
		}
	}

	onMount(() => {
		$hideGradient = true
		$hideBottomMenu = true
		// $hideBottomSpace = true
	})

	onDestroy(() => {
		$hideGradient = false
		$hideBottomMenu = false
		// $hideBottomSpace = false
	})

	$: ({ walletAddress, curve, gatheringWallet, poolIndex, name, supply, ETHUSD } = data)

	$: console.log({ walletAddress, curve, gatheringWallet, poolIndex, name, supply, ETHUSD })
</script>

{#if !walletAddress || walletAddress !== $signerAddress}
	<h1 class="text-2xl font-medium mt-6 mb-3 text-center">Wrong wallet address</h1>
	<p>You have signed up to TeleSages with: {truncateAddr(walletAddress)}</p>
	<p>but you are connected with: {truncateAddr($signerAddress)}</p>
	<p>please switch your wallet to continue, if you feel this is a mistake please contact us on <a class="text-primary underline" href="https://t.me/Telesage">telegram</a></p>
{:else}
	{#if buying}
		<div class="fixed top-0 left-0 right-0 bottom-0 grid place-items-center z-[999999] bg-[#00000069]">
			{#if !error}
				<Loading text="Transaction in process, wait for wallet..." />
			{:else}
				<div class="flex flex-col items-center gap-3">
					<p class="text-lg text-center">{error}</p>
					<div class="flex gap-3">
						<Button muted on:click={() => {error = '';buying = false; }}>Cancel</Button>
						<Button on:click={buyKeys}>Retry</Button>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	{#if !success}
		<div class="flex flex-col h-screen relative" class:blur-[16px]={buying}>
			<h1 class="mt-5 text-3xl font-medium text-center mb-3">Buy Keys</h1>

			<WalletInfo />
			<div class="flex-1"></div>

			<div class="flex flex-col items-center justify-center"> <!-- min-h-[calc(100vh-260px)] -->
				<img
					src="/default_gathering_1.webp" alt="gathering"
					class="w-20 h-20 rounded-full my-3"
				/>
				
				<h2 class="font-medium text-[22px]">{name}</h2>
				<p class="mt-1 font-medium text-menu text-dark-text">supply 
				{#await getCurrSupply()}
					--
				{:then supply} 
					{supply}
				{/await}
				</p>
			</div>

			<div class="flex items-center justify-between w-2/3 mx-auto mt-5">
				<Button
					class="dark:bg-[#4E4E4ECC] dark:hover:!bg-[#4E4E4ECC]/60 bg-primary-light/20 dark:!text-white !text-primary-light hover:!bg-primary-light/30 w-10 h-10 [&>*]:w-6 [&>*]:h-6 p-0"
					isIcon muted
					on:click={() => amount = amount > 1 ? amount - 1 : amount}
				>
					<MinusIcon />
				</Button>

				<span class="text-[32px] font-medium">{amount}</span>
				<Button
					class="dark:bg-[#4E4E4ECC] dark:hover:!bg-[#4E4E4ECC]/60 bg-primary-light/20 dark:!text-white !text-primary-light hover:!bg-primary-light/30 w-10 h-10 [&>*]:w-6 [&>*]:h-6 p-0"
					isIcon muted
					on:click={() => amount = amount + 1}
				>
					<PlusIcon />
				</Button>
			</div>

			<div class="flex flex-col w-full mt-9">
				<div class="rounded-btn dark:bg-[#202224] bg-[#F5F8FB] text-center py-4 mb-[9px]">
					{#await getKeysPrice(amount)}
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
			
			<div class="flex-1"></div>
			{#if curve !== 'Fixed'}
				<Notification
					title="Price not guaranteed"
					description='for highly volatile groups price may change very quickly, if transaction failes with "Insufficient payment" it means that somebody bought key before you, refresh page and try again...'
					type="warning"
					class="dark:!bg-[#202224]"
				/>
			{/if}
		
			<div class="pt-3 pb-5">
				<Button class="block w-full mt-3 text-base" on:click={buyKeys}>
					<SellIcon />	
					<span class="block ml-[10px]">Buy</span>
				</Button>
			</div>
		</div>
	{:else}
		<BuySuccess hash={success} {name} supply={Number(supply ?? 0) + Number(amount ?? 0)} />
	{/if}
{/if}

<!-- <Button on:click={async () => {
	try {

const buy = await writeContract({
    address: PUBLIC_CONTRACT_ADDRESS,
    abi: TSabi.abi,
    functionName: 'buyKeys',
    args: ['0x339c3c59e1cf3998f5abc14ff3d0930f292ab019', 0, 1],
	// value: 1
    value: Number(currentPriceWithFees)
})
console.log({ buy })

// const sell = await writeContract({ 
//     address: SHARES_CONTRACT_ADDRESS, 
//     abi: TSabi.abi, 
//     functionName: 'sellShares', 
//     args: ['0x7279553ABF75424d31772aE816c8aB1bE75aBac2', 0, 1],
// })
// console.log({sell})

		// await monitorEvents()
		// mam tx hash, to moze realtime listen to Events and update UI when tx confirmed or in db?
	} catch(err) {
		console.log(err)
	}

}}>BUY KEY</Button> -->

<!-- 
await writeContract({
    address: SHARES_CONTRACT_ADDRESS,
    abi: TSabi.abi,
    functionName: 'buyShares',
    args: ['0xc7F56c3561c14857dadDcB5146c7813D0EbEaDae', 13, 0],
    // value: '0.011'
})
// fail reason: Insufficient payment
//------------------------------------------

await writeContract({
    address: SHARES_CONTRACT_ADDRESS,
    abi: TSabi.abi,
    functionName: 'buyShares',
    args: ['0xc7F56c3561c14857dadDcB5146c7813D0EbEaDae', 13, 0],
    value: '0.011'
})
// works
//--------------------------------------

await writeContract({
    address: SHARES_CONTRACT_ADDRESS,
    abi: TSabi.abi,
    functionName: 'buyShares',
    args: ['0xc7F56c3561c14857dadDcB5146c7813D0EbEaDae', 13, 10],
    value: '1'
})

//fails with: An unknown error occurred while executing the contract function -->