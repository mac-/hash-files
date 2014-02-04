var fs = require('fs'),
	_ = require('underscore'),
	async = require('async'),
	glob = require('glob'),
	algorithms = {
		sha1: require('sha1'),
		md5: require('MD5')
	};

require('read-files');

module.exports = function(options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	if (!options || !callback) {
		throw new Error('Missing or invalid parameters');
	}

	var files = options.files || ['./**'],
		algorithm = options.algorithm || 'sha1',
		globFunctions = [];

	if (algorithm !== 'sha1' && algorithm !== 'md5') {
		throw new Error('Invalid algorithm. Please choose "sha1" or "md5".');
	}
	files.forEach(function(file) {
		globFunctions.push(function(cb) {
			glob(file, { mark: true }, function(err, globbedFiles) {
				cb(err, globbedFiles);
			});
		});
	});
	async.parallel(globFunctions, function(err, results) {
		if (err) {
			return callback(err);
		}
		results = _.flatten(results, true);

		files = _.chain(results.sort())
					.unique(true)
					.filter(function(file) {
						return (file[file.length-1] !== '/');
					})
					.value();
		// pass in a clone of the files array since readFiles apparently modifies it
		fs.readFiles(files.slice(0), function(err, data) {
			if (err) {
				return callback(err);
			}

			var content = '';
			files.forEach(function(file) {
				content += data[file];
			});
			callback(null, algorithms[algorithm](content));

		});
	});
};