const { NotImplementedError } = require('../extensions/index.js')

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
	let counter = 1
	const arr = []
	arr.push(
		str.split('').reduce((encoded, char, index) => {
			if (str[index - 1] !== char) {
				arr.push(encoded)
				encoded = `${char}`
				counter = 1
			} else {
				counter += 1
				encoded = `${counter}${char}`
			}
			return encoded
		}, '')
	)

	return arr.join('')
}

module.exports = {
	encodeLine,
}
