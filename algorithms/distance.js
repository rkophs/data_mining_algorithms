/*
* @Author: ryan
* @Date:   2016-10-04 09:56:02
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-10-25 15:17:50
*/

'use strict';

const minkowski = function(p, x, y) {

	let sum = 0;
	const d = Math.min(x.length, y.length);
	for (let i = 0; i < d; i++) {
		sum += Math.pow(Math.abs(x[i] - y[i]), p);
	}

	//return sum;
	return Math.pow(sum, 1/p);
}

const hamming = function(x, y) {
	return minkowski(1, x, y);
}

const euclidean = function(x, y) {
	return minkowski(2, x, y);
}

module.exports = {
	hamming: hamming,
	euclidean: euclidean
}