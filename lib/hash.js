var fs = require('fs'),
	_ = require('underscore'),
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

	var directory = options.directory || './',
		algorithm = options.algorithm || 'sha1';

	directory = directory.replace(/\/$/, ''); // remove trailing slash
	
	if (algorithm !== 'sha1' && algorithm !== 'md5') {
		throw new Error('Inavlid algorithm. Please choose "sha1" or "md5".');
	}
	glob(directory + '/**/*', { mark: true }, function(err, files) {
		if (err) {
			return callback(err);
		}
		files = _.filter(files.sort(), function(file) {
			return (file[file.length-1] !== '/');
		});
		fs.readFiles(files, function(err, data) {
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