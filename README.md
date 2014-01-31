# hash-dir-contents

A simple function for computing the hash of the contents of an entire directory.


[![Build Status](https://secure.travis-ci.org/mac-/hash-dir-contents.png)](http://travis-ci.org/mac-/hash-dir-contents)
[![Coverage Status](https://coveralls.io/repos/mac-/hash-dir-contents/badge.png)](https://coveralls.io/r/mac-/hash-dir-contents)
[![NPM version](https://badge.fury.io/js/hash-dir-contents.png)](http://badge.fury.io/js/hash-dir-contents)
[![Dependency Status](https://david-dm.org/mac-/hash-dir-contents.png)](https://david-dm.org/mac-/hash-dir-contents)

[![NPM](https://nodei.co/npm/hash-dir-contents.png?downloads=true&stars=true)](https://nodei.co/npm/hash-dir-contents/)

## Installation

	npm install hash-dir-contents

## Usage

This module exports a function that has the following signature:

	function([options], callback)

where `options` is an object that can contain the following properties:

* `directory` - (optional) The directory to hash the contents of. Defaults to the current working directory.
* `algorithm` - (optional) The algorithm to use to hash the content, "sha1" or "md5". Defaults to "sha1".

and `callback` is a function that will be passed an error object as the first parameter and the hash as the second parameter.


## Examples

	var hasher = require('hash-dir-contents');

	hasher({
		directory: '/home/me/stuff',
		algorithm: 'md5'
	}, function(error, hash) {
		console.log(hash); // example: '843d5af0230cb6ddcd767e9d92f7e152'
	});


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/mac-/hash-dir-contents/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

