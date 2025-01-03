const { NotImplementedError } = require('../extensions/index.js')

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
	const numArr = n.toString(10).split('')
	let max = -Infinity

	for (let i = 0; i < numArr.length; i++) {
		max = Math.max(Number(numArr.toSpliced(i, 1).join('')), max)
	}

	return max
}

module.exports = {
	deleteDigit,
}
