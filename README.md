# hash-files

A simple function for computing the hash of the contents of a set of files.


[![Build Status](https://secure.travis-ci.org/mac-/hash-files.png)](http://travis-ci.org/mac-/hash-files)
[![Coverage Status](https://coveralls.io/repos/mac-/hash-files/badge.png)](https://coveralls.io/r/mac-/hash-files)
[![NPM version](https://badge.fury.io/js/hash-files.png)](http://badge.fury.io/js/hash-files)
[![Dependency Status](https://david-dm.org/mac-/hash-files.png)](https://david-dm.org/mac-/hash-files)

[![NPM](https://nodei.co/npm/hash-files.png?downloads=true&stars=true)](https://nodei.co/npm/hash-files/)

## Installation

	npm install hash-files

## Usage

This module exports a function that has the following signature:

	function([options], callback)

where `options` is an object that can contain the following properties:

* `files` - (optional) A collection of file paths to hash the contents of. Defaults to `['./**']` (all the files in the current working directory)
* `algorithm` - (optional) The algorithm to use to hash the content, "sha1" or "md5". Defaults to "sha1".

and `callback` is a function that will be passed an error object as the first parameter and the hash as the second parameter.


## Examples

```js
var hasher = require('hash-files');

hasher({
	files: ['/home/me/stuff', '/some/other/file.txt'],
	algorithm: 'md5'
}, function(error, hash) {
	console.log(hash); // example: '843d5af0230cb6ddcd767e9d92f7e152'
});
```

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/mac-/hash-files/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

