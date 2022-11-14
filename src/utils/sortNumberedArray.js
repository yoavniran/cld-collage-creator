/**
 * creates a copy of the array so to not affect original
 * @param arr
 * @returns {*[]}
 */
const sortNumberedArray = (arr) =>
	[...arr].sort((a, b) => a - b);

export default sortNumberedArray;
