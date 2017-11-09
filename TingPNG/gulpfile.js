var gulp = require('gulp');
var tinypng = require('gulp-tinypng-compress');

gulp.task("tinypng", function() {
	gulp.src('images/*.{png,jpg,jpeg}')
		.pipe(tinypng({
			// key: '申请TinyPNG的KEY',  申请TinyPNG的KEY https://tinypng.com/developers/subscription
			key: 'oj4v8XXHItpv9nanR05OjjaQlMCgKarR', // 这是我申请的key, 每月只有500张
			sigFile: 'images/.tinypng-sigs',
			log: true
		})).on('error', function(err) {
			console.error(err.message);
		})
		.pipe(gulp.dest('dist/'));
});

gulp.task('default', ['tinypng']);
