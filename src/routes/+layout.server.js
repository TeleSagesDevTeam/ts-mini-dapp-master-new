import { error } from '@sveltejs/kit'

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ cookies, url }) => {
	const x = url.searchParams.get('x')
	const session = cookies.get('session')

	if(!x || !session) error(500, '.')
}