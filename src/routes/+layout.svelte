<script>
	import '../app.pcss'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import { networkName, konekt, swicz, error, state, showSwitch } from '$lib/wagmi.js'
	import { hideBottomMenu, hideIntroOverflow, hideTopSpace, hideGradient } from '$Stores/ui.js'
	import Button from '$UI/Button.svelte'
	import Circles from '$UI/Circles.svelte'
	import Loading from '$UI/Loading.svelte'
	import { RefreshIcon } from '$Icons/'

	export let data

	let mounted

	onMount(() => {
		mounted = true
		theme = 'dark'
		document.body.classList.add(theme)
	})

	$: ({ theme } = data)
	$: if(theme) {
		document.body.classList.remove('light')
		document.body.classList.remove('dark')
		document.body.classList.add(theme)
		document.documentElement.classList.remove('light')
		document.documentElement.classList.remove('dark')
		document.documentElement.classList.add(theme)
	}

	$: console.log($error, 'e')
</script>

<div
	class="relative max-h-screen min-h-[100dvh] h-[100dvh] mx-auto overflow-hidden"
	class:dark={theme === 'dark'}
>
	<div
		class="px-4 max-h-[calc(100vh)] overflow-x-hidden relative"
		class:overflow-hidden={$hideIntroOverflow}
		class:overflow-auto={!$hideIntroOverflow}
		id="content__layout"
	>
		{#if mounted}
			{#if $page.error}
				<slot />
			{:else}
				{#if !$state}
					<h1 class="pt-24 font-medium text-intro-title text-center">Connect</h1>
					<p class="text-base text-center font-medium text-light-text">
						Start by connecting to ETH network.
					</p>
				
					<Circles>
						<img src="/wallet.png" alt="" class="w-[86px] h-[86px] invert">
					</Circles>
				
				<div class="fixed flex w-full pr-8 bottom-5 z-[100]">
					<Button class="flex-1 ml-2 text-base" on:click={konekt}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<mask id="mask0_403_611" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
								<rect width="24" height="24" fill="#D9D9D9"/>
							</mask>
							<g mask="url(#mask0_403_611)">
								<path d="M6 20C4.9 20 3.95833 19.6083 3.175 18.825C2.39167 18.0417 2 17.1 2 16V8C2 6.9 2.39167 5.95833 3.175 5.175C3.95833 4.39167 4.9 4 6 4H18C19.1 4 20.0417 4.39167 20.825 5.175C21.6083 5.95833 22 6.9 22 8V16C22 17.1 21.6083 18.0417 20.825 18.825C20.0417 19.6083 19.1 20 18 20H6ZM6 8H18C18.3667 8 18.7167 8.04167 19.05 8.125C19.3833 8.20833 19.7 8.34167 20 8.525V8C20 7.45 19.8042 6.97917 19.4125 6.5875C19.0208 6.19583 18.55 6 18 6H6C5.45 6 4.97917 6.19583 4.5875 6.5875C4.19583 6.97917 4 7.45 4 8V8.525C4.3 8.34167 4.61667 8.20833 4.95 8.125C5.28333 8.04167 5.63333 8 6 8ZM4.15 11.25L15.275 13.95C15.425 13.9833 15.575 13.9833 15.725 13.95C15.875 13.9167 16.0167 13.85 16.15 13.75L19.625 10.85C19.4417 10.6 19.2083 10.3958 18.925 10.2375C18.6417 10.0792 18.3333 10 18 10H6C5.56667 10 5.1875 10.1125 4.8625 10.3375C4.5375 10.5625 4.3 10.8667 4.15 11.25Z" fill="white"/>
							</g>
						</svg>
				
						<span class="block ml-2">Connect Wallet</span>
					</Button>
				</div>

				{/if}
  
				{#if $state === 'connecting'}
					<Loading text=...connecting... />
				{/if}
  
				{#if $state === 'connected'}
					<div class="relative z-[100000]">
						<slot />
					</div>
				{/if}

				{#if $state === 'unsupported'}
					<h1 class="text-2xl font-medium mt-6 mb-3 text-center">Unsupported network</h1>
					<p>We currently only support Arbitrum Sepolia network</p>
					<p>You are currently connected to: {$networkName}</p>
					<p>Please wait for automatic network switch or</p>
					<Button class="mt-3 w-5/6 mx-auto" on:click={swicz}>SWITCH NETWORK</Button>
				{/if}

				{#if $error}
					{#if typeof $error !== 'string'}
						<pre>{JSON.stringify($error, null, 2)}</pre>
					{:else}
						<p class="error">{$error}</p>
					{/if}

					<Button class="flex-1 mt-2 text-base"
						on:click={() => window.location = window.location}
					>
						<RefreshIcon />
						<span class="block ml-2">Try again</span>
					</Button>
				{/if}
			{/if}
		{:else}
			<Loading />
		{/if}
	</div>

	{#if !$hideGradient}
		<div class="fixed max-w-[100vw] bottom-0 w-screen min-h-screen overflow-hidden pointer-events-none z-[-12] max-w-screen">
			<img
				src={theme === 'light' ? '/bg-light.png' : '/bg.png'}
				alt=""
				class="absolute bottom-0 z-10 -translate-x-1/2 left-1/2 w-full min-w-[400px]"
			/>

			{#if theme !== 'light'}
				<div class="h-[453px] w-[510px] -z-20 rounded-full absolute -bottom-28 blur-3xl isolate left-1/2 -translate-x-1/2 bg-primary/60"></div>
			{/if}
		</div>
	{/if}

</div>

<style>
	:global(body) {
		background: #141414;
		color: #fff;
		color-scheme: dark;
	}

	:global(body.light) {
		background: #fff;
		color: #141414;
		color-scheme: light;
	}
</style>