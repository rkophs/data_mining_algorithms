/*
* @Author: ryan
* @Date:   2016-09-28 12:38:47
* @Last Modified by:   ryan
* @Last Modified time: 2016-09-28 14:55:39
*/

'use strict';

const swap = function(arr, i, j) {
	const tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
	return arr;
}

const initWith = function(n, e) {
	const a = [];
	for(let i = 0; i < n; i++) {
		a.push(e);
	}
	return a;
}

const initRange = function(start, n){
	const out = [];
	for (let i = 0; i < n; i++) {
		out[i] = i + start;
	}
	return out;
}

const includes = function(arr, elem) {
	return arr.indexOf(elem) >= 0;
}

const copy = function(arr) {
	return arr.concat();
}

const unique = function(arr) {
	const sorted = copy(arr).sort();
	for (let i = 1; i < sorted.length; ) {
		if (sorted[i-1] === sorted[i]) {
			sorted.splice(i,1); //Remove duplicate
		} else {
			i++;
		}
	}
	return sorted;
}

const intersection = function(a, b) {
	let cross = [];
	for (let i = 0; i < a.length; i++) {
		if (includes(b, a[i])) {
			cross.push(a[i]);
		}
	}
	for (let i = 0; i < b.length; i++) {
		if (includes(a, b[i])) {
			cross.push(b[i]);
		}
	}
	return unique(cross);
}

const union = function(a, b) {
	return unique(a.concat(b));
}

module.exports = {
	swap: swap,
	includes: includes,
	initRange: initRange,
	initWith: initWith,
	copy: copy,
	intersection: intersection,
	unique: unique,
	union: union
}