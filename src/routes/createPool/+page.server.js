import { decrypt } from '$server/auth.js'
/** @type {import('./$types').PageLoad} */
export const load = async ({ locals, url }) => {
	const { walletAddress, maxPoolIndex } = await locals.pb.collection('UserStats').getOne(locals.dbID)

	const x = url.searchParams.get('x')
	return {
		poolIndex: maxPoolIndex + 1,
		walletAddress,
		x: JSON.parse(await decrypt(x))
		// telegramID: locals.telegramID,
		// telegramUsername: locals.telegramUsername,
		// xUsername: locals.xUsername ? locals.xUsername : undefined
	}
}