/** @type {import('./$types').PageLoad} */
export const load = async ({ locals, url }) => {
	const { walletAddress, maxPoolIndex } = await locals.pb.collection('UserStats').getOne(locals.dbID)

	return {
		poolIndex: maxPoolIndex + 1,
		walletAddress
		// telegramID: locals.telegramID,
		// telegramUsername: locals.telegramUsername,
		// xUsername: locals.xUsername ? locals.xUsername : undefined
	}
}