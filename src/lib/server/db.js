import { BACKEND_TOKEN, POCKETBASE_URL } from '$env/static/private'
import PocketBase from 'pocketbase'

export const pb = new PocketBase(POCKETBASE_URL)
pb.beforeSend = function(url, options) {
	options.headers = Object.assign({}, options.headers, {
		'bakend_token': BACKEND_TOKEN
	})
}

export async function genHash(originalId) {
    // Convert the original ID to a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(originalId.toString());

    // Use the SubtleCrypto API to hash the data
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Map the hash to a string with only letters (A-Z, a-z)
    let alphaHash = '';
    for (let i = 0; i < hashHex.length && alphaHash.length < 15; i++) {
        const byte = parseInt(hashHex.substring(i, i + 2), 16);
        alphaHash += String.fromCharCode(byte % 52 + (byte % 52 < 26 ? 65 : 71));
    }

    // Ensure the string is exactly 15 characters
    alphaHash = alphaHash.substring(0, 15);

    return alphaHash;
}