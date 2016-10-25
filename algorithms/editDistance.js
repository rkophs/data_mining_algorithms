/*
* @Author: ryan
* @Date:   2016-10-04 10:12:40
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-10-25 15:20:34
*/

'use strict';

const triMin = function(a, b, c) {
	return Math.min(Math.min(a, b), c);
};

const remove = function(x, y, m, n) {
	return editDistance(x, y, m, n - 1) + 1;
}

const insert = function(x, y, m, n) {
	return editDistance(x, y, m - 1, n) + 3;
}

const substitute = function(x, y, m, n) {
	return editDistance(x, y, m-1, n-1) + 5;
}

const editDistance = function(x, y, m, n) {

	// X is empty, requires all deletions
	if (m == 0 && n != 0) {
		return remove(x, y, m, n);
	}

	// Y is empty, requires all insertions
	if (n == 0 && m != 0) {
		return insert(x, y, m, n);
	}

	// Both are empty
	if (n == 0 && m == 0) {
		return 0;
	}

	//Same element, nothing to do, move to the next
	if (x[ m - 1 ] == y[ n - 1 ]) {
		return editDistance(x, y, m - 1, n - 1);
	}

	return triMin(
			remove(x, y, m, n),
			insert(x, y, m, n),
			substitute(x, y, m, n)
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