import { recoverMessageAddress } from 'viem'
// import { error, redirect } from '@sveltejs/kit'
// import { decrypt, encrypt, getSessionData } from '$lib/server/auth'
// import { pb } from '$lib/server/db'

const validActions = ['linkWallet', 'becomeSage']
const verifySignature = async (message, signature, walletAddress) => {
	const recoveredAddress = await recoverMessageAddress({
		message, signature
	})

	if(recoveredAddress === walletAddress) {
		return true
	} else return false
}

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals, url }) => {
	return {
		telegramID: locals.telegramID,
		telegramUsername: locals.telegramUsername,
		xUsername: locals.xUsername ? locals.xUsername : undefined
	}
}

// export const actions = {
// 	verify: async ({ request }) => {
// 		let x
// 		let action

// 		try {
// 			const url = new URL(request.url)
// 			x = url.searchParams.get('x')
// 			const decrypted = await decrypt(x)

// 			if(decrypted) {
// 				try {
// 					const parsed = JSON.parse(decrypted)
// 					const props = parsed.props
// 					action = parsed.action
					
// 					if(!validActions.includes(action)) throw error(500, '.')

// 					const { telegramUsername, telegramID } = props
// 					const formData = await request.formData()
// 					const signature = await formData.get('signature')
// 					const walletAddress = await formData.get('walletAddress')

// 					const msg = {
// 						telegramID, telegramUsername,
// 						walletAddress,
// 						message: 'helo frens'
// 					}
// 					const toSign = JSON.stringify(msg, null, 2)
// 					const sigValid = await verifySignature(toSign, signature, walletAddress)

// 					if(sigValid) {
// 						try {
// 							const user = {
// 								telegramID: telegramID.toString(),
// 								telegramUsername,
// 								walletAddress,
// 								walletProof: signature,
// 							}
// 							console.log({user})

// 							const saveUser = await pb.collection('Users').create(user)
// 							if(saveUser && saveUser.id) {
// 								throw redirect(307, 'https://t.me/telesages_bot/dashboard?startapp=linked')
// 							}

// 						} catch(saveToDBerror) {
// 							console.error(saveToDBerror.response)
// 						}
// 					}
// 				} catch(formDataError) {
// 					console.error({formDataError})
// 				}
// 			}
// 		} catch(decryptError) {
// 			console.error({decryptError})
// 		}
// 	}
// }