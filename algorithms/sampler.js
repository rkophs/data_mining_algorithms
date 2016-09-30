/*
* @Author: ryan
* @Date:   2016-09-28 12:44:43
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-09-29 23:39:45
*
* Description: Choose random sample of input space P
*  - Time complexity: O(2|n|) for sample_v1, O(|n|) for sample
*  - Notes: http://cs-people.bu.edu/evimaria/cs565-16/lect1.pdf
*/

'use strict';

const Random = require('../util/random.js');
const array = require('../util/array.js');
const Shuffle = require('./shuffle.js');

class Sampler {

	constructor(seed) {
		this.r = new Random(seed);
		this.s = new Shuffle(seed);
	}

	sample_v1(P_array, n) {
		const shuffled = this.s.shuffleCopy(P_array);
		const S = [];
		for(let i = 0; i < n; i++) {
			S.push(shuffled[i]);
		}
		return S;
	}

	sample(P_array, n) {
		const pLen = P_array.length;
		const S = [];
		for(let i = 0; i < n; i++) {
			S.push(P_array[i]);
		}
		for(let i = n; i < pLen; i++) {
			let rand = this.r.randomInt(0, i);
			if (rand < n) {
				S[rand] = P_array[i];
			}
		}
		return S;
	}

	sampleIndexes(eLen, n) {
		let result = [];
		while (result.length < n) {
			for (let i = 0; i < n; i++) {
				result.push(this.r.randomInt(0, eLen - 1));
				result = array.unique(result);
			}
		}
		return result.slice(0,n).sort((a,b) => {return a - b});
	}
}

module.exports = Sampler;