const { NotImplementedError } = require('../extensions/index.js')

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
	if (!Array.isArray(arr)) {
		throw new Error("'arr' parameter must be an instance of the Array!")
	}

	const transformedArr = []

	for (let i = 0; i < arr.length; i += 1) {
		const item = arr[i]

		switch (item) {
			case '--discard-next': {
				if (i + 1 === arr.length) {
					continue
				}
				i += 2
				break
			}
			case '--discard-prev': {
				if (i === 0) {
					continue
				}
				transformedArr.pop()
				break
			}
			case '--double-next': {
				if (i + 1 === arr.length) {
					continue
				}
				transformedArr.push(arr[i + 1])
				break
			}
			case '--double-prev': {
				if (i === 0) {
					continue
				}
				transformedArr.push(arr[i - 1])
				break
			}
			default: {
				transformedArr.push(item)
			}
		}
	}

	return transformedArr
}

module.exports = {
	transform,
}
