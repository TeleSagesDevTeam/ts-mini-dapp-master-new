import { http, createConfig, connect, switchChain, watchAccount, injected } from '@wagmi/core'
import { arbitrumSepolia } from '@wagmi/core/chains'
import { writable } from 'svelte/store'

export const connection = writable(false)
export const walletAddress = writable('')
export const state = writable('')
export const error = writable()
export const currentChain = writable({})
export const networkName = writable('')
export const showSwitch = writable(false)

export const config = createConfig({
	chains: [arbitrumSepolia],
	connectors: [injected()],
	transports: {
		[arbitrumSepolia.id]: http()
	}
})
export const unwatch = watchAccount(config, {
	async onChange(data) {
		try {
			const { address, chainId, status, isConnected } = data
			const chains = config.chains
			const isChainSupported = chains.find(c => c.id === chainId)

			walletAddress.set(address)
			connection.set(isConnected)
			networkName.set(data?.chain?.name ?? '')
	
			if(!isChainSupported) {
				state.set('unsupported')
			} else {
				walletAddress.set(address)
				if(isConnected) state.set('connected')
			}
		} catch(err) {
			state.set(false)
			console.log(err)
			console.log('onc---------------------')
			error.set(err.message)
		}
	}
})

export const konekt = async () => {
	state.set('connecting')
	error.set('')

	try {
		const { accounts, chainId } = await connect(config, {
			chainId: arbitrumSepolia.id,
			connector: injected()
		})

		// if(chainId && chainId === arbitrumSepolia.id) {
		// 	state.set('connected')
		// }
	} catch(err) {
		state.set(false)
		console.log(err)
		console.log('kon---------------------')
		error.set(err.message)
	}
}

export const swicz = async () => {
	try {
		await switchChain(config, { chainId: arbitrumSepolia.id })
	} catch(err) {
		console.log(err)
		console.log('swc---------------------')
		error.set(err.message)
	}
}