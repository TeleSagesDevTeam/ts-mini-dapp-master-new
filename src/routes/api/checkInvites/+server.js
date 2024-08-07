import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ locals, request }) => {
	console.log(locals)
}

