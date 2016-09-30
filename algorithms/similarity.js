/*
* @Author: ryan
* @Date:   2016-09-28 14:24:20
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-09-29 23:50:10
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
const Sampler = require("./sampler.js");
const array = require("../util/array.js");

class MinHashV1 {

	constructor(seed, n) {
		this.s = new Shuffle(seed);
		this.n = n;
	}

	/*
	 * Returns a permutation hash of index of elements:
	 * Params:
	 *  - perm: {1, 4, 0, 3, 2} => {b, e, a, d, c}
	 * Output:
	 *  - h(S): min({ i in {0 ... n} | n = |S| & perm[i] = 1 })
	 */
	buildPermuationHash(perm) {
		return function(S) {
			let result = -1;
			for (let i = 0; i < perm.length; i++) {
				let j = perm[i];
				if (S[j] == 1) {
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
	buildPermuationHashes(eLen, n, shuffle) {
		const index = array.initRange(0, eLen);
		const hashes = [];
		for (let i = 0; i < n; i++) {
			let perm = shuffle(index);
			hashes.push(this.buildPermuationHash(perm));
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
	buildCharacteristicMatrix(elements, sets) {
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
	buildSignature(hashes, S) {
		const result = [];
		for (let i = 0; i < hashes.length; i++) {
			result.push(hashes[i](S));
		}
		return result;
	}

	minHash(a, b) {
		const E = array.union(a, b);
		const matrix = this.buildCharacteristicMatrix(E, [a, b]);
		const hashes = this.buildPermuationHashes(E.length, this.n, (index) => {
			return this.s.shuffleCopy(index);
		});

		let union = 0;
		let sigA = this.buildSignature(hashes, matrix[0]);
		let sigB = this.buildSignature(hashes, matrix[1]);
		for (let i = 0; i < this.n; i++) {
			if (sigA[i] == sigB[i]) {
				union++;
			}
		}

		return union / this.n;
	}
}

class MinHash {

	constructor(seed, hashCount, rowCount) {
		this.sampler = new Sampler(seed);
		this.hashCount = hashCount;
		this.rowCount = rowCount;
	}

	buildHash(a, p) {
		return function(x) {
			return (a*x) % p;
		}
	}

	buildHashes(eLen, n) {
		const hashes = [];
		for (let i = 0; i < n; i++) {
			hashes.push(this.buildHash(i, eLen));
		}
		return hashes;
	}

	buildSigMatrix(n, sCount) {
		let matrix = [];
		for (let i = 0; i < n; i++) {
			matrix.push([]);
			for (let j = 0; j < sCount; j++) {
				matrix[i][j] = Number.POSITIVE_INFINITY;
			}
		}
		return matrix;
	}

	handleRow(row, column, hashes, sMatrix, cMatrix) {
		if (cMatrix(row, column) == 0) {
			return;
		}
		for (let i = 0; i < hashes.length; i++) {
			let min = Math.min(sMatrix[i][column], hashes[i](row));
			sMatrix[i][column] = min;
		}
	}

	minHash(eLen, cMatrix) {
		const hashes = this.buildHashes(eLen, this.hashCount);
		const rows = this.sampler.sampleIndexes(eLen, this.rowCount);
		const sMatrix = this.buildSigMatrix(this.hashCount, 2);
		for (let i = 0; i < this.rowCount; i++) {
			let row = rows[i];
			this.handleRow(row, 0, hashes, sMatrix, cMatrix);
			this.handleRow(row, 1, hashes, sMatrix, cMatrix);
		}

		let union = 0;
		for (let i = 0; i < this.hashCount; i++) {
			if (sMatrix[i][0] == sMatrix[i][1]) {
				union++;
			}
		}

		return union / this.hashCount;
	}
}

class Similarity {

	constructor(seed) {
		this.seed = seed;
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

	minHash_v1(a, b, k) {
		const minHash = new MinHashV1(this.seed, k);
		return minHash.minHash(a, b);
	}

	minHash(n, k, eLen, cMatrixCB) {
		const minHash = new MinHash(this.seed, n, k);
		return minHash.minHash(eLen, cMatrixCB);
	}
}

const run = function() {
	var s = new Similarity(10);
	var hashCount = 200;
	var rowCount = 7001;
	var data = [[],[]];
	for (let i = 0; i < 10000; i++) {
		data[0][i] = i*2;
		data[1][i] = i*4;
	}
	var E = array.union(data[0], data[1]);
	var eLen = E.length;
	console.log(s.minHash_v1(data[0], data[1], hashCount));
	console.log(s.minHash(hashCount, rowCount, eLen, (r, c) => {
		return array.includes(data[c], E[r]) ? 1 : 0;
	}));
	console.log(s.jaccardCoefficient(data[0], data[1]));
}

module.exports = Similarity;
