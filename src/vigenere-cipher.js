const { NotImplementedError } = require('../extensions/index.js')

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
	constructor(isDirect = true) {
		this.isDirect = isDirect
		this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		this.vigenereSquare = this.createVigenereSquare()
	}

	createVigenereSquare() {
		const square = []

		for (let i = 0; i < this.alphabet.length; i++) {
			const row = []

			for (let j = 0; j < this.alphabet.length; j++) {
				row.push(this.alphabet[(i + j) % this.alphabet.length])
			}

			square.push(row)
		}

		return square
	}

	encrypt(paramMessage, paramKey) {
		if (paramMessage === undefined || paramKey === undefined) {
			throw new Error('Incorrect arguments!')
		}

		let key = paramKey.toUpperCase()
		const upperCaseMessage = paramMessage.toUpperCase()
		let message = paramMessage
			.toUpperCase()
			.split('')
			.filter((char) => this.alphabet.includes(char))
			.join('')

		while (key.length < message.length) {
			key += key
		}

		if (key.length > message.length) {
			key = key.slice(0, message.length)
		}

		key = key.split('')
		message = message.split('')

		for (let i = 0; i < message.length; i++) {
			const rowIndex = this.alphabet.indexOf(message[i])
			const columnIndex = this.alphabet.indexOf(key[i])
			message[i] = this.vigenereSquare[rowIndex][columnIndex]
		}

		for (let i = 0; i < upperCaseMessage.length; i++) {
			if (!this.alphabet.includes(upperCaseMessage[i])) {
				message.splice(i, 0, upperCaseMessage[i])
			}
		}

		if (!this.isDirect) {
			return message.reverse().join('')
		}

		return message.join('')
	}

	decrypt(paramMessage, paramKey) {
		if (paramMessage === undefined || paramKey === undefined) {
			throw new Error('Incorrect arguments!')
		}

		let key = paramKey.toUpperCase()
		const upperCaseMessage = paramMessage.toUpperCase()
		let message = paramMessage
			.toUpperCase()
			.split('')
			.filter((char) => this.alphabet.includes(char))
			.join('')

		while (key.length < message.length) {
			key += key
		}

		if (key.length > message.length) {
			key = key.slice(0, message.length)
		}

		key = key.split('')
		message = message.split('')

		for (let i = 0; i < message.length; i++) {
			const columnIndex = this.alphabet.indexOf(key[i])
			const rowIndex = this.vigenereSquare[columnIndex].indexOf(message[i])
			message[i] = this.alphabet[rowIndex]
		}

		for (let i = 0; i < upperCaseMessage.length; i++) {
			if (!this.alphabet.includes(upperCaseMessage[i])) {
				message.splice(i, 0, upperCaseMessage[i])
			}
		}

		if (!this.isDirect) {
			return message.reverse().join('')
		}

		return message.join('')
	}
}

module.exports = {
	VigenereCipheringMachine,
}
