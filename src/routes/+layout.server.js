import { MINIAPP_URL } from '$env/static/private'
import { error } from '@sveltejs/kit'
import { decrypt } from '$server/auth.js'

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ cookies, url }) => {
	const x = url.searchParams.get('x')
	const session = cookies.get('session')

	if(!x || !session) error(500, '.')
		return {
			x: JSON.parse(await decrypt(x)),
			MiniApp_URL: MINIAPP_URL
		}
}