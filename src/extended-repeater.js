const { NotImplementedError } = require('../extensions/index.js')

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
	let propStr = typeof str !== 'string' ? String(str) : str

	if (!options) {
		return propStr
	}

	const repeatTimes = 'repeatTimes' in options ? options.repeatTimes : 1
	const separator = 'separator' in options ? options.separator : '+'
	const addition =
		'addition' in options
			? typeof options.addition === 'string'
				? options.addition
				: String(options.addition)
			: ''
	let additionRepeatTimes = 'additionRepeatTimes' in options ? options.additionRepeatTimes : 1
	const additionSeparator = 'additionSeparator' in options ? options.additionSeparator : '|'

	let resultArr = []

	for (let i = 0; i < repeatTimes; i++) {
		resultArr.push(propStr)

		for (let j = 0; j < additionRepeatTimes; j++) {
			resultArr.push(addition)

			if (j !== additionRepeatTimes - 1) {
				resultArr.push(additionSeparator)
			}
		}

		if (i !== repeatTimes - 1) {
			resultArr.push(separator)
		}
	}

	return resultArr.join('')
}

module.exports = {
	repeater,
}
