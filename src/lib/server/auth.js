import crypto from 'crypto'
import { SECRET } from '$env/static/private'

export const encrypt = async text => {
	return new Promise((resolve, reject) => {
		try {
			const iv = crypto.randomBytes(12)
			const cipher = crypto.createCipheriv(
				'chacha20-poly1305', Buffer.from(SECRET, 'hex'), iv,
				{ authTagLength: 16	}
			)

			const encrypted = Buffer.concat([
				cipher.update(
					Buffer.from(text), 'utf8'),
					cipher.final()
			])
			const tag = cipher.getAuthTag()
			const final = Buffer.concat([iv, tag, encrypted]).toString('hex')

			resolve(final)
		} catch(err) {
			reject(err)
		}
	})
}

export const decrypt = async text => {
	return new Promise((resolve, reject) => {
		try {
			const decipher = crypto.createDecipheriv(
				'chacha20-poly1305',
				Buffer.from(SECRET, 'hex'),
				Buffer.from(text.substring(0, 24), 'hex'),
				{ authTagLength: 16 }
			)
			decipher.setAuthTag(Buffer.from(text.substring(24, 56), 'hex'))
			const decrypted = [
				decipher.update(
					Buffer.from(text.substring(56), 'hex'),
					'binary', 'utf8'
				),
				decipher.final('utf8')
			].join('')

			resolve(decrypted)
		} catch(err) {
			reject(err)
		}
	})
}

export const genSecureRandom = () => {
	const LENGTH = 16
	const randomValues = new Uint8Array(LENGTH)
	const randomBytes = crypto.getRandomValues(randomValues)

	return Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

//get dbID from telegram username by
// const hashInteger = n => {
// 	const hash = crypto.createHash('sha256')
// 	hash.update(n.toString())
// 	return hash.digest('hex')
// }
// const truncateHash = (hash, length = 15) => hash.substring(0, length)
// const hexToAlphanumeric = hex => {
// 	const alphanumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
// 	return hex.split('').map(c => alphanumeric[parseInt(c, 16)]).join('')
// }
// export const getDBid = (n, length = 15) => {
// 	const hex = hashInteger(n)
// 	return truncateHash(hexToAlphanumeric(hex), length)
// }