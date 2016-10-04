/*
* @Author: ryan
* @Date:   2016-10-04 10:12:40
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-10-04 10:28:08
*/

'use strict';

const triMin = function(a, b, c) {
	return Math.min(Math.min(a, b), c);
};

const editDistance = function(x, y, m, n) {
	if (m == 0) {
		return n;
	}

	if (n == 0) {
		return m;
	}

	//Same element, nothing to do, move to the next
	if (x[ m - 1 ] == y[ n - 1 ]) {
		return editDistance(x, y, m - 1, n - 1);
	}

	return 1 + triMin(
			editDistance(x,  y, m, n-1), 	//Insert
			editDistance(x,  y, m-1, n), 	//Remove
			editDistance(x,  y, m-1, n-1)	//Replace
		);
}

class EditDistance {

	constructor() {

	}

	editDistance(x, y) {
		return editDistance(x, y, x.length, y.length);
	}
}

module.exports = EditDistance;