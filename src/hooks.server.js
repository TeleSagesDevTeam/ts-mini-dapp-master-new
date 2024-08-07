import { dev } from '$app/environment'
import { error } from '@sveltejs/kit'
import { decrypt } from '$server/auth.js'
import { pb } from '$server/db.js'

const cookieOptions = {
	path: '/',
	httpOnly: true,
	secure: dev ? false : true,
	sameSite: 'lax'
}

/** @type {import('@sveltejs/kit').Handle} */
/** @type {import('@sveltejs/kit').RequestEvent} */
export const handle = async ({ event, resolve }) => {
	const { url: { searchParams } } = event
	const x = searchParams.get('x')

	const setSession = async s => {
		try {
			event.cookies.delete('session', cookieOptions)
			const decrypted = await decrypt(s)
			const sessionData = JSON.parse(decrypted)

			event.cookies.set('session', s, cookieOptions)
			event.locals = structuredClone(sessionData)
			event.locals.pb = pb
			console.log(sessionData)
		} catch(error) {
			event.cookies.delete('session', cookieOptions)
			event.locals = undefined
			error(500, '.')
			console.log('TODO:report abuse', error)
		}
	}

	if(x) {
		event.cookies.delete('session', cookieOptions)
		await setSession(x)
	} else {
		const session = event.cookies.get('session')
		
		if(!session) {
			event.locals = {}
			error(500, '.')
		} else {
			await setSession(session)
		}
	}
	
	return await resolve(event)
}