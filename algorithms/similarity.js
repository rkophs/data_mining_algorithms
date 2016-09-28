/*
* @Author: ryan
* @Date:   2016-09-28 14:24:20
* @Last Modified by:   ryan
* @Last Modified time: 2016-09-28 16:03:54
* Description: Computes the Jaccard Coefficient and Distance
*  - Notes: http://cs-people.bu.edu/evimaria/cs565-16/lect3.pdf
*/

'use strict';

const Shuffle = require("./shuffle.js");
const array = require("../util/array.js");

const generatePermuations = function(n, k, shuffle) {
	const index = array.initRange(0, n);
	const permutations = [];
	for (let i = 0; i < k; i++) {
		permutations.push(shuffle(index));
	}
	return permutations;
}

const generateMatrix = function(elements, vectors) {
	const matrix = [];
	for (let i = 0; i < elements.length; i++) {
		matrix.push([]);
		let e = elements[i];
		for (let j = 0; j < vectors.length; j++) {
			let v = array.includes(vectors[j], e) ? 1 : 0;
			matrix[i].push(v);
		}
	}
	return matrix;
}

const generateSignature = function(permutation, matrix) {
	const n = matrix[0].length;
	const result = array.initWith(n, -1);
	for (let i = 0; i < n; i++){
		for (let j = 0; j < permutation.length; j++) {
			let index = permutation[j];
			if (matrix[index][i] == 1) {
				result[i] = j;
				break;
			}
		}
	}
	return result;
}

class Similarity {

	constructor(seed, k) {
		this.s = new Shuffle(seed);
		this.k = k;
	}

	minHash_v1(a, b) {
		const elements = array.union(a, b);
		const n = elements.length;
		const permutations = generatePermuations(n, this.k, (index) => {
			return this.s.shuffleCopy(index);
		});
		const matrix = generateMatrix(elements, [a, b]);

		let union = 0;
		for (let i = 0; i < this.k; i++) {
			let signature = generateSignature(permutations[i], matrix);
			if (signature[0] == signature[1]) {
				union++;
			}
		}

		return union / this.k;
	}

	minHash(vectors) {
		
	}
}

module.exports = Similarity;
