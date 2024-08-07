<script>
	import { PUBLIC_BOT_URL } from "$env/static/public";
	import { onMount, onDestroy } from "svelte";
	import { signMessage } from "@wagmi/core";
	import { walletAddress, error, config } from "$lib/wagmi.js";
	import { postAction } from "$lib/helper.js";
	import {
	  hideBottomMenu,
	  hideIntroOverflow,
	  hideTopSpace,
	  hideGradient,
	} from "$Stores/ui.js";
	import Button from "$UI/Button.svelte";
	import Circles from "$UI/Circles.svelte";
	import CodeBlock from "$UI/CodeBlock.svelte";
	import Loading from "$UI/Loading.svelte";
	import Success from "$lib/Components/Success.svelte";
	import TelegramIcon from "$Icons/Telegram.svelte";
  
	export let data;
  
	let subState = "";
	let signature = "";
	let backToTele = `${PUBLIC_BOT_URL}/become`;
	let message_text = ``;
	$: console.log({ subState, signature, toSign });
  
	const sajn = async () => {
	  try {
		$error = false;
		subState = "signing";
  
		signature = await signMessage(config, {
		  message: JSON.stringify(toSign, null, 2),
		});
		subState = "verifying";
		const verify = await fetch("/api/verify", {
		  method: "POST",
		  body: JSON.stringify({
			walletAddress: $walletAddress,
			signature,
		  }),
		  headers: {
			"content-type": "application/json",
		  },
		});
		const res = await verify.json();
		if (res.redirect) {
		  subState = "verified";
		  backToTele = res.redirect;
		} else {
		  subState = "failed";
		  $error = res;
		}
	  } catch (err) {
		$error = err.message;
		console.log(err.message);
		subState = "failed";
	  }
	};
  
	onMount(() => {
	  $error = "";
	  $hideIntroOverflow = false;
	});
  
	$: ({ telegramID, telegramUsername, xUsername } = data);
	$: toSign = {
	  telegramID,
	  telegramUsername,
	  xUsername,
	  walletAddress: $walletAddress,
	  message: message_text,
	};
  
	function formatWalletAddress(address) {
	  const start = address.slice(0, 9);
	  const end = address.slice(-9);
	  return `${start} . . . ${end}`;
	}
	$: formattedAddress = formatWalletAddress($walletAddress);
  </script>
  
  {#if subState === ""}
	<h1 class="pt-6 font-medium text-intro-title mb-md text-center">
	  Link your wallet
	</h1>
	<p class="text-base text-center font-medium text-light-text mb-10">
	  Please follow steps below to verify ownership of wallet address and link it
	  to your telegram account.
	</p>
  
	<div class="bg-[#202224] rounded-[10px] px-4 py-2">
	  <div
		class="mt-3 h-[50px] flex items-center gap-2 w-full justify-center s-hk4p2fPJRaRR bg-slate-500 rounded-lg"
	  >
		<svg
		  width="24"
		  height="24"
		  viewBox="0 0 24 24"
		  fill="none"
		  xmlns="http://www.w3.org/2000/svg"
		>
		  <mask
			id="mask0_403_611"
			style="mask-type:alpha"
			maskUnits="userSpaceOnUse"
			x="0"
			y="0"
			width="24"
			height="24"
		  >
			<rect width="24" height="24" fill="#D9D9D9" />
		  </mask>
		  <g mask="url(#mask0_403_611)">
			<path
			  d="M6 20C4.9 20 3.95833 19.6083 3.175 18.825C2.39167 18.0417 2 17.1 2 16V8C2 6.9 2.39167 5.95833 3.175 5.175C3.95833 4.39167 4.9 4 6 4H18C19.1 4 20.0417 4.39167 20.825 5.175C21.6083 5.95833 22 6.9 22 8V16C22 17.1 21.6083 18.0417 20.825 18.825C20.0417 19.6083 19.1 20 18 20H6ZM6 8H18C18.3667 8 18.7167 8.04167 19.05 8.125C19.3833 8.20833 19.7 8.34167 20 8.525V8C20 7.45 19.8042 6.97917 19.4125 6.5875C19.0208 6.19583 18.55 6 18 6H6C5.45 6 4.97917 6.19583 4.5875 6.5875C4.19583 6.97917 4 7.45 4 8V8.525C4.3 8.34167 4.61667 8.20833 4.95 8.125C5.28333 8.04167 5.63333 8 6 8ZM4.15 11.25L15.275 13.95C15.425 13.9833 15.575 13.9833 15.725 13.95C15.875 13.9167 16.0167 13.85 16.15 13.75L19.625 10.85C19.4417 10.6 19.2083 10.3958 18.925 10.2375C18.6417 10.0792 18.3333 10 18 10H6C5.56667 10 5.1875 10.1125 4.8625 10.3375C4.5375 10.5625 4.3 10.8667 4.15 11.25Z"
			  fill="white"
			/>
		  </g>
		</svg>
		{formattedAddress}
	  </div>
  
	  <textarea
		class="mt-5 rounded-md placeholder-white placeholder-opacity-50 outline-none p-3 w-full h-32"
		bind:value={message_text}
		placeholder="Make sure that message you see here and message you sign are identical."
	  />
	  <!-- {message_text} -->
	</div>
  
	<!-- <CodeBlock code={JSON.stringify(toSign, null, 2)} /> -->
  
	<div class="fixed inset-x-0 bottom-3 pb-safe z-50 flex">
	  <Button
		class="flex-1 mx-2 text-base"
		on:click={sajn}
		disabled={subState === "signing"}
	  >
		<span class="block ml-2">Sign Message</span>
	  </Button>
	</div>
  {/if}
  
  {#if subState === "signing" || subState === "verifying"}
	<Loading />
  {/if}
  
  {#if subState === "verified"}
	<Success />
  
	<div class="fixed flex w-full pr-8 bottom-5 z-[100]">
	  <a
		href={backToTele}
		target="_blank"
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
  