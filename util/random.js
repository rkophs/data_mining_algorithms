/*
* @Author: ryan
* @Date:   2016-09-28 12:01:22
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-09-29 20:06:01
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