/*
* @Author: ryan
* @Date:   2016-09-28 13:35:08
* @Last Modified by:   ryan
* @Last Modified time: 2016-09-28 15:20:45
*
* Description: Computes the Jaccard Coefficient and Distance
*  - Notes: http://cs-people.bu.edu/evimaria/cs565-16/lect3.pdf
*/

'use strict';

const array = require('./array.js');

const jaccardCoefficient = function(a, b) {
	if (a.length == 0 && b.length == 0) {
		return 1;
	}
	return (array.intersection(a, b).length) / (array.union(a, b).length);
}

const jaccardDistance = function(a, b) {
	return 1 - jaccardCoefficient(a, b);
}

module.exports = {
	jaccardCoefficient: jaccardCoefficient,
	jaccardDistance: jaccardDistance
}