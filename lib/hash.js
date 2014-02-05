var fs = require('fs'),
	_ = require('underscore'),
	async = require('async'),
	glob = require('glob'),
	algorithms = {
		sha1: require('sha1'),
		md5: require('MD5')
	};

function hashFiles(options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	if (!options || !callback) {
		throw new Error('Missing or invalid parameters');
	}

	var files = options.files || ['./**'],
		algorithm = options.algorithm || 'sha1',
		encoding = options.encoding || 'utf8',
		batchCount = options.batchCount || 100,
		globFunctions = [],
		readFileFunctions = [],
		handleGlob = function(file) {
			return function(cb) {
				glob(file, { mark: true }, cb);
			};
		},
		handleReadFile = function(file) {
			return function(cb) {
				fs.readFile(file, { encoding: encoding }, cb);
			};
		};

	if (algorithm !== 'sha1' && algorithm !== 'md5') {
		throw new Error('Invalid algorithm. Please choose "sha1" or "md5".');
	}

	if (options.noGlob) {
		globFunctions.push(process.nextTick);
	}
	else {
		files.forEach(function(file) {
			globFunctions.push(handleGlob(file));
		});
	}
	async.parallelLimit(globFunctions, batchCount, function(err, results) {
		if (err) {
			return callback(err);
		}
		results = (options.noGlob) ? files : _.flatten(results, true);

		files = _.chain(results.sort())
					.unique(true)
					.filter(function(file) {
						return (file[file.length-1] !== '/');
					})
					.value();


		files.forEach(function(file) {
			readFileFunctions.push(handleReadFile(file));
		});

		async.parallelLimit(readFileFunctions, batchCount, function(err, fileContents) {
			if (err) {
				return callback(err);
			}
			callback(null, algorithms[algorithm](fileContents.join('')));
		});
	});
}

function hashFilesSync(options) {
	options = options || {};

	var files = options.files || ['./**'],
		allFiles = [],
		fileContents = '',
		algorithm = options.algorithm || 'sha1',
		encoding = options.encoding || 'utf8';

	if (algorithm !== 'sha1' && algorithm !== 'md5') {
		throw new Error('Invalid algorithm. Please choose "sha1" or "md5".');
	}

	if (!options.noGlob) {
		files.forEach(function(file) {
			allFiles = allFiles.concat(glob.sync(file, { mark: true }));
		});
		files = allFiles;
	}

	files = _.chain(files.sort())
				.unique(true)
				.filter(function(file) {
					return (file[file.length-1] !== '/');
				})
				.value();

	files.forEach(function(file) {
		fileContents += fs.readFileSync(file, { encoding: encoding });
	});

	return algorithms[algorithm](fileContents);
}

hashFiles.sync = hashFilesSync;

module.exports = hashFiles;