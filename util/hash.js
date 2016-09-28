/*
* @Author: ryan
* @Date:   2016-09-28 14:32:43
* @Last Modified by:   ryan
* @Last Modified time: 2016-09-28 15:20:36
*/

'use strict';

const Random = require("./random.js");
const arrays = require("./arrays.js");

class Hash {

	constructor(key) {
		this.r = new Random(key);
	}

	minHash(a, b) {
		const n = a.length;
		const index = arrays.initRange(0, n);
	}
}