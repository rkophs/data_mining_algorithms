/*
* @Author: ryan
* @Date:   2016-09-28 11:26:11
* @Last Modified by:   ryan
* @Last Modified time: 2016-09-28 14:52:13
*
* Description: Fisher-Yates Shuffle (In place shuffle)
*  - Time complexity: O(n)
*  - Notes: http://cs-people.bu.edu/evimaria/cs565-16/lect1.pdf
*  - Wiki: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
*/

'use strict';

const Random = require('../util/random.js');
const array = require('../util/array.js');

class Shuffle {

	constructor(seed) {
		this.r = new Random(seed);
	}

	shuffleInPlace(arr) {
		const n = arr.length;
		for (let i = n - 1; i >= 0; i--) {
			const j = this.r.randomInt(0, i);
			array.swap(arr, i, j);
		}
		return arr;
	}

	shuffleCopy(arr) {
		const n = arr.length;
		const out = [];
		for (let i = 0; i < n; i++) {
			const j = this.r.randomInt(0, i);
			if (j != i) {
				out[i] = out[j];
				out[j] = arr[i];
			} else {
				out.push(arr[i]);
			}
		}
		return out;
	}

	run() {
		const arr = [1,2,3,4,5,6,7,8,9,10];
		const copy = this.shuffleCopy(arr);
		console.log(`Ordered: ${arr}`);
		this.shuffleInPlace(arr);
		console.log(`Shuffle Copy: ${copy}`);
		console.log(`Shuffled In Place: ${arr}`);
	}
}

module.exports = Shuffle;
