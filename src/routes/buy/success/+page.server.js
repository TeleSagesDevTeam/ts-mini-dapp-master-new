import { fail } from '@sveltejs/kit'

// /** @type {import('./$types').PageLoad} */
// export const load = async ({ fetch, locals, url }) => {
// 	console.log(url)

// 	return {
// 		hash: 'todo'
// 	}
// }

export const actions = {
	default: async ({ locals, url }) => {
		const tx = url.searchParams.get('tx')
		const { userDbID, gatheringDbID } = locals

		console.log(`userID="${userDbID}" & gatheringID="${gatheringDbID}" & tx="${tx}"`)
		const invites = await locals.pb.collection('InvitationLinks').getList(1, 50, {
			filter: `userID="${userDbID}" && gatheringID="${gatheringDbID}" && tx="${tx}"`
		})
		if(invites && invites.items.length) {
			return { invites: invites.items }
		} else return fail(404) 
	}
}