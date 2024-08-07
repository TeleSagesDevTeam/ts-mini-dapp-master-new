import { error, json } from '@sveltejs/kit'
import { recoverMessageAddress } from 'viem'

const verifySignature = async (message, signature, walletAddress) => {
	const recoveredAddress = await recoverMessageAddress({
		message, signature
	})

	if(recoveredAddress === walletAddress) {
		return true
	} else return false
}

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ locals, request }) => {
	const { signature, walletAddress } = await request.json()

	const { telegramID, telegramUsername, xUsername, from } = locals ?? {}

	const msg = {
		telegramID,
		telegramUsername,
		xUsername: xUsername ? xUsername : undefined,
		walletAddress,
		message: 'helo frens'
	}
	const toSign = JSON.stringify(msg, null, 2)
	const sigValid = await verifySignature(toSign, signature, walletAddress)
console.log({toSign, sigValid, walletAddress, signature})
	if(sigValid) {
		try { 
			const user = {
				telegramID, telegramUsername,
				walletAddress,
				walletProof: signature
			}
			console.log(locals.pb)
			console.log({ user })
			const saveUser = await locals.pb.collection('Users').create(user)

			console.log({ saveUser })
			if(saveUser && saveUser.id) {
				return json({
					redirect: `https://t.me/telesages_seed_bot/dashboard?startapp=${from}`
				})
			} else throw(500, 'd')
		} catch(saveError) {
			if(saveError.status === 400 && saveError.message === 'Failed.to create record.') {
				//TODO: juz istnieje, lub cos innego
			}
			console.log(saveError.response)
			return json({
				error: saveError
			})
			console.error()
			// throw error(500, 's')
		}
	} else {
		return json({ sigValid })
	}

	

	// if(action === 'linkWallet' && signature && walletAddress) {
	// 	const { telegramUsername, telegramID, xUsername } = props
		
	// 	const toSign = JSON.stringify(msg, null, 2)
	// 	const sigValid = await verifySignature(toSign, signature, walletAddress)

	// 	if(sigValid) {
	// 		try { 
	// 			const user = {
	// 				telegramID, telegramUsername,
	// 				xUsername,
	// 				walletAddress,
	// 				walletProof: signature
	// 			}
	// 			console.log({ user })
	// 			const saveUser = await pb.collection('Users').create(user)
	// 			if(saveUser && saveUser.id) {
	// 				return json({
	// 					redirect: `https://t.me/telesages_seed_bot/dashboard?startapp=walletVerified`
	// 				})
	// 			}
	// 		} catch(saveError) {
	// 			console.error(saveError.response)
	// 			throw error(500, 's')
	// 		}
	// 	} else {
	// 		return json({ sigValid })
	// 	}
	// }
}