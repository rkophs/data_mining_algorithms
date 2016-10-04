/*
* @Author: ryan
* @Date:   2016-10-04 09:56:02
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-10-04 10:12:29
*/

'use strict';

const minkowski = function(p, x, y) {

	let sum = 0;
	const d = Math.min(x.length, y.length);
	for (let = 0; i < d; i++) {
		sum += Math.pow(Math.abs(x[i] - y[i])), p);
	}

	return Math.pow(sum, 1/p);
}

const hamming = function(x, y) {
	return Minkowski(1, x, y);
}

const euclidean = function(x, y) {
	return Minkowski(2, x, y);
}

module.exports = {
	hamming: hamming,
	euclidean: euclidean,
	stringEditDistance: stringEditDistance
}