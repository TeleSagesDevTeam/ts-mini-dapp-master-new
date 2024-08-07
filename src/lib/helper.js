import { error as Error } from '@sveltejs/kit'
import { parse } from 'devalue'
import { encodeAbiParameters, keccak256 } from 'viem'

export const postAction = async (action, details) => {
	try {
		const actionReq = await fetch(action, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: new URLSearchParams(details)
		})

		const { type, status, data } = await actionReq.json()

		if(status === 200 && type === 'success') {
			return parse(data)
		} else {
			throw Error(500, )
		}
	} catch(err) {
		console.log('x', err)
		return {
			errors: err
		}
	}
}

export const truncateAddr = (addr, len = 9) => addr ? addr.substring(0, len) + '...' + addr.substring(addr.length - len) : undefined
export const etherToWei = etherValue => Math.round(etherValue * 1e18)

export const replacer = (key, value) => {
	if(typeof value === 'bigint') return value.toString()

	return value
}

export const getPoolID = (subject, poolIndex) => {
	const params = [
		{ name: 'keySubject', type: 'address' },
		{ name: 'poolIndex', type: 'uint256' }
	]
	const values = [subject, poolIndex]
	const encodedParams = encodeAbiParameters(params, values)

	return keccak256(encodedParams)
}