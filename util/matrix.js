/*
* @Author: ryan
* @Date:   2016-09-30 12:01:53
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-10-04 10:10:04
*
* Description:
*  - Notes:
*  - http://www.cs.utexas.edu/users/inderjit/public_papers/HLA_SVD.pdf
*/

'use strict';

const array = require("./array.js");

const copy = function(a) {
	const result = [];
	for (let i = 0; i < a.length; i++) {
		result.push(array.copy(a[i]));
	}
	return result;
}

const e1Vector = function(n) {
	const result = array.initWith(n, 0);
	result[0] = 1;
	return transpose([result]);
}

const minorWithout = function(a, x, y) {
	let length = a.length-1;
	const result = [];
	for(let i = 0; i < length; i++) {
		result.push([]);
		for(let j = 0; j < length; j++) {
			if(i < x && j < y) {
				result[i].push(a[i][j]);
			} else if (i >= x && j < y){
				result[i].push(a[i+1][j]);
			} else if (i < x && j >= y){
				result[i].push(a[i][j+1]);
			} else{ //i > x && j > y
				result[i].push(a[i+1][j+1]);
			}
		}
	}

	return result;
}

const determinant = function(a) {
	const n = a.length;
	if (n == 1) {
		return a[0][0];
	}

	let sign = 1;
	let sum = 0;
	for (let i = 0; i < n; i++) {
		sum += sign * a[0][i] * determinant(minorWithout(a, 0, i));
		sign *= 1;
	}
	return sum;
}

const identity = function(m, n) {
	const result = [];
	for (let i = 0; i < m; i++) {
		result.push(array.initWith(n, 0));
		if (i < n) {
			result[i][i] = 1;
		}
	}
	return result;
}

const magnitude = function(v) {
	let sum = 0;
	for (let i = 0; i < v.length; i++){
		sum += (v[i]*v[i]);
	}
	return Math.sqrt(sum);
}

const product = function(a, b) {
	if (a[0].length != b.length) {
		return null;
	}

	const m = a.length;
	const n = a[0].length;
	const p = b[0].length;
	const result = [];
	for (let i = 0; i < m; i++) {
		result.push([]);
		for (let j = 0; j < p; j++) {
			let sum = 0;
			for (let k = 0; k < n; k++) {
				sum += (a[i][k]*b[k][j]);
			}
			result[i].push(sum);
		}
	}
	return result;
}

const sum = function(a, b){
	const m = a.length;
	const n = a[0].length;
	const result = [];
	for (let i = 0; i < m; i++) {
		result.push([]);
		for (let j = 0; j < n; j++) {
			result[i].push(a[i][j] + b[i][j]);
		}
	}
	return result;
}

const difference = function(a, b){
	const m = a.length;
	const n = a[0].length;
	const result = [];
	for (let i = 0; i < m; i++) {
		result.push([]);
		for (let j = 0; j < n; j++) {
			result[i].push(a[i][j] - b[i][j]);
		}
	}
	return result;
}

const transpose = function(a) {
	const m = a.length;
	const n = a[0].length;
	const aT = [];
	for (let i = 0; i < n; i++) {
		aT.push([]);
		for (let j = 0; j < m; j++) {
			aT[i].push(a[j][i]);
		}
	}
	return aT;
}

const sign = function(x) {
	if (x[0] < 0) {
		return -1;
	}
	return 1;
}

const reflectorV = function(x) {
	const n = x.length;
	const e1 = e1Vector(n);
	const scalar = sign(x)*magnitude(x);
	for (let i = 0; i < n; i++){
		e1[i][0] = e1[i][0]*scalar;
	}
	return difference(x, e1);
}

const column = function(a, j) {
	const result = [];
	for (let i = 0; i < a.length; i++) {
		result.push([a[i][j]]);
	}
	return result;
}

const householder = function(a) {
	const m = a.length;
	const n = a[0].length;
	const I = identity(m,m);
	console.log(I);
	let x = column(a, 0);
	const v1 = reflectorV(x);
	let prod = 0;
	for (let i = 0; i < v1.length; i++) {
		prod += (v1[i]*v1[i]);
	}
	prod = 2/prod;
	const vvt = product(v1, transpose(v1));
	console.log(vvt);
	for (let i = 0; i < vvt.length; i++) {
		for (let j = 0; j < vvt[i].length; j++) {
			vvt[i][j] = vvt[i][j]*prod;
		}
	}
	console.log(vvt);
	const h1 = difference(I, vvt);
	console.log(h1);
	return h1;
}

// let u = [[1],[1],[1],[1]];
// //u = [[-1, 1, 1, 1]];
// console.log(householder(u));

module.exports = {
	copy: copy,
	determinant: determinant,
	identity: identity,
	magnitude: magnitude,
	product: product,
	transpose: transpose
}