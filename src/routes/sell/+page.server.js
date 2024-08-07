import { MINIAPP_URL } from '$env/static/private'
import { decrypt } from '$server/auth.js'
let lastReqTime = 0
let lastPrice = 0

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, locals, url }) => {

	if(Date.now() - lastReqTime < 5000 && lastPrice) {
		return {
			ethPrice: lastPrice
		}
	}

	const req = await fetch('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=5D6JRVXPK8VMPQHFGU6B5DWJMRR5FAQUG6')
	const res = await req.json()
  
	const { sageWalletAddress, poolIndex, userDbID, gatheringDbID } = locals
	const { walletAddress } = await locals.pb.collection('Users').getOne(userDbID)
	const { name, thumbnail } = await locals.pb.collection('Gatherings').getOne(gatheringDbID)
    const { items } = await locals.pb.collection('InvitationLinks').getList(1, 50, {
        filter: `gatheringID="${gatheringDbID}" && userID="${userDbID}" && status != 'revoked'`
    })

	lastReqTime = Date.now()
	lastPrice = res.result.ethusd

	const x = url.searchParams.get('x')
	return {
		stuff: 'some',
		ETHUSD: lastPrice,
		gatheringWallet: sageWalletAddress,
		walletAddress,
		poolIndex,
		name,
        keys: items ?? [],
		x: JSON.parse(await decrypt(x)),
		MiniApp_URL: MINIAPP_URL
		// telegramID: locals.telegramID,
		// telegramUsername: locals.telegramUsername,
		// xUsername: locals.xUsername ? locals.xUsername : undefined
	}
}