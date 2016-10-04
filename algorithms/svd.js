/*
* @Author: ryan
* @Date:   2016-09-30 12:13:36
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-09-30 14:00:14
*/

'use strict';

const matrix = require("../util/matrix.js");

const householderReduction(A) {
	const m = A.length;
	const n = A[0].length;
	let B = matrix.copy(A);
	let U = matrix.identity(m, n);
	let V = matrix.identity(n, n);

	for (let k = 0; k < n; k++) {
		
	}
}

class SVD {

	constructor() {

	}

	svd(A) {
		const m = A.length;
		const n = A[0].length;

	}
}