<script>
	import { PUBLIC_BOT_URL } from '$env/static/public'
	import { onMount, onDestroy } from 'svelte'
	import { signMessage } from '@wagmi/core'
	import { walletAddress, error, config } from '$lib/wagmi.js'
	import { postAction } from '$lib/helper.js'
	import { hideBottomMenu, hideIntroOverflow, hideTopSpace, hideGradient } from '$Stores/ui.js'
	import Button from '$UI/Button.svelte'
	import Circles from '$UI/Circles.svelte'
	import CodeBlock from '$UI/CodeBlock.svelte'
	import Loading from '$UI/Loading.svelte'
	import Success from '$lib/Components/Success.svelte'
	import TelegramIcon from '$Icons/Telegram.svelte'
	
	export let data

	let subState = ''
	let signature = ''
	let backToTele = `${PUBLIC_BOT_URL}/become`

$: console.log({ subState, signature, toSign })

	const sajn = async () => {
		try {
			$error = false
			subState = 'signing'

			signature = await signMessage(config, {
				message: JSON.stringify(toSign, null, 2)
			})
			subState = 'verifying'
			const verify = await fetch('/api/verify', {
				method: 'POST',
				body: JSON.stringify({
					walletAddress: $walletAddress,
					signature
				}),
				headers: {
					'content-type': 'application/json'
				}
			})
			const res = await verify.json()
			if(res.redirect) {
				subState = 'verified'
				backToTele = res.redirect
			} else {
				subState = 'failed'
				$error = res
			}
		} catch(err) {
			$error = err.message
			console.log(err.message)
			subState = 'failed'
		}
	}

    onMount(() => {
		$error = ''
        $hideIntroOverflow = false
    })

	$: ({ telegramID, telegramUsername, xUsername } = data)
	$: toSign = {
		telegramID, telegramUsername,
		xUsername,
		walletAddress: $walletAddress,
		message: 'helo frens',
	}
</script>

{#if subState === ''}
	<h1 class="pt-6 font-medium text-intro-title mb-md text-center">Link your wallet</h1>
	<p class="text-base text-center font-medium text-light-text mb-10">
		Please follow steps below to verify ownership of wallet address and link it to your telegram account.
	</p>

	<CodeBlock code={JSON.stringify(toSign, null, 2)} />
	<p>Make sure that message you see here and message you sign are identical.</p>


	<div class="fixed inset-x-0 bottom-3 pb-safe z-50 flex">
		<Button class="flex-1 mx-2 text-base" on:click={sajn} disabled={subState === 'signing'}>
			<span class="block ml-2">Sign Message</span>
		</Button>
	</div>
{/if}

{#if subState === 'signing' || subState === 'verifying'}
	<Loading />
{/if}


{#if subState === 'verified'}
	<Success />

	<div class="fixed flex w-full pr-8 bottom-5 z-[100]">
		<a
			href="{backToTele}" target="_blank"
			class="flex-1 text-btn p-btn ml-2 text-base bg-primary hover:bg-primary/90 active:bg-primary/80 text-white dark:bg-primary dark:hover:bg-primary-hover dark:active:bg-primary-active'} flex items-center justify-center rounded-btn"
		>
			<TelegramIcon />
			<span class="block ml-2">Back to Telegram</span>
		</a>
	</div>

	<!-- <button class="bn29 a" disabled>
		<a target="_blank" href="{backToTele}">BACK TO TELEGRAM</a>
	</button> -->
{/if}