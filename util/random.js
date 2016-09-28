/*
* @Author: ryan
* @Date:   2016-09-28 12:01:22
* @Last Modified by:   ryan
* @Last Modified time: 2016-09-28 15:20:51
*/

'use strict';

class Random {
	
	constructor(seed) { /* nop */ } 

	randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	random() {
		return Math.random();
	}
}

module.exports = Random;