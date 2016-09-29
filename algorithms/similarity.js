/*
* @Author: ryan
* @Date:   2016-09-28 14:24:20
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-09-29 18:53:30
* Description: Computes the Jaccard Coefficient and Distance
*  - Notes: http://cs-people.bu.edu/evimaria/cs565-16/lect3.pdf
*  - http://infolab.stanford.edu/~ullman/mmds/ch3.pdf
* 
* Annotations correspond to the following data for the
*   tokens, {a, b, c, d, e}, and documents {s_0...3}
*
*     | a | b | c | d | e |
*  s_0| 1 | 0 | 0 | 1 | 0 |
*  s_1| 0 | 0 | 1 | 0 | 0 |
*  s_2| 0 | 1 | 0 | 1 | 1 |
*  s_3| 1 | 0 | 1 | 1 | 0 |
*/

'use strict';

const Shuffle = require("./shuffle.js");
const array = require("../util/array.js");

/*
 * Returns a permutation hash of index of elements:
 * Params:
 *  - perm: {1, 4, 0, 3, 2} => {b, e, a, d, c}
 * Output:
 *  - h(S): min({ i in {0 ... n} | n = |S| & perm[i] = 1 })
 */
const buildPermuationHash = function(perm) {
	return function(s) {
		let result = -1;
		for (let i = 0; i < perm.length; i++) {
			let j = perm[i];
			if (s[j] == 1) {
				result = i;
				break;
			}
		}
		return result;
	}
}

/*
 * Returns a list of k hashes via permutations of index of elements
 */
const buildPermuationHashes = function(n, k, shuffle) {
	const index = array.initRange(0, n);
	const hashes = [];
	for (let i = 0; i < k; i++) {
		let perm = shuffle(index);
		hashes.push(buildPermuationHash(perm));
	}
	return hashes;
}

/*
 * Returns the characteristic matrix:
 *     | a | b | c | d | e |
 *  s_0| 1 | 0 | 0 | 1 | 0 |
 *  s_1| 0 | 0 | 1 | 0 | 0 |
 *  s_2| 0 | 1 | 0 | 1 | 1 |
 *  s_3| 1 | 0 | 1 | 1 | 0 |
 */
const buildCharacteristicMatrix = function(elements, sets) {
	const matrix = [];
	for (let i = 0; i < sets.length; i++) {
		matrix.push([]);
		let s = sets[i];
		for (let j = 0; j < elements.length; j++) {
			let e = elements[j];
			let bit = array.includes(s, e) ? 1 : 0;
			matrix[i].push(bit);
		}
	}
	return matrix;
}

/*
 * Returns a signature for a set, S
 * { h(S) | h in hashes }
 */
const buildSignature = function(hashes, s) {
	const result = [];
	for (let i = 0; i < hashes.length; i++) {
		result.push(hashes[i](s));
	}
	return result;
}

class Similarity {

	constructor(seed, k) {
		this.s = new Shuffle(seed);
		this.k = k;
	}

	jaccardCoefficient(a, b) {
		if (a.length == 0 && b.length == 0) {
			return 1;
		}
		return (array.intersection(a, b).length) / (array.union(a, b).length);
	}

	jaccardDistance(a, b) {
		return 1 - jaccardCoefficient(a, b);
	}

	minHash_v1(a, b) {
		const E = array.union(a, b);
		const matrix = buildCharacteristicMatrix(E, [a, b]);
		const hashes = buildPermuationHashes(E.length, this.k, (index) => {
			return this.s.shuffleCopy(index);
		});

		let union = 0;
		let sigA = buildSignature(hashes, matrix[0]);
		let sigB = buildSignature(hashes, matrix[1]);
		for (let i = 0; i < this.k; i++) {
			if (sigA[i] == sigB[i]) {
				union++;
			}
		}

		return union / this.k;
	}

	minHash(vectors) {
		
	}
}

var s = new Similarity(10, 200);
var a = [1,2,3,4,5,6,7,8,9];
var b = [1,2,3,4,5,6,7,8,9];
console.log(s.minHash_v1(a, b));
console.log(s.jaccardCoefficient(a, b));

module.exports = Similarity;
