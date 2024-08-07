<script>
	import { getBalance } from '@wagmi/core'
	import { config, walletAddress, networkName } from '$lib/wagmi.js'
	import { truncateAddr } from '$lib/helper.js'

	const frmtr = new Intl.NumberFormat(navigator.language)
</script>

<div class="dark:bg-[#202224] bg-[#F5F8FB] items-center flex px-[11px] py-[19px] rounded-btn gap-3">
	<div class="flex-1 w-max">
		<h1 class="text-base font-medium">{truncateAddr($walletAddress)}</h1>

		<p class="font-medium text-menu text-light-text">
			{$networkName}
		</p>
	</div>

	<div class="text-right w-max">
		<h1 class="text-base font-medium">
			{#await getBalance(config, { address: $walletAddress })}
				...loading...
			{:then balance}
				{@const { formatted, symbol } = balance}
				{frmtr.format(formatted)} {symbol}
			{/await}
		</h1>

		<p class="font-medium text-menu text-light-text">Balance</p>
	</div>
</div>