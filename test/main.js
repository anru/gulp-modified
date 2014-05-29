
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var gulp = require('gulp');
var modified = require('../');
var reduce = require('stream-reduce');

function touch(path, done) {
    fs.readFile(path, function(err, data) {
        if (err) return done(err);
        fs.writeFile(path, data, function(err) {
            done(err);
        });
    });
}


describe('gulp-concat', function() {
    it('should process only for modified files', function(done) {
        gulp.src(path.join(__dirname, 'fixtures/*.txt'))
            .pipe(modified('text'))
            .pipe(reduce(function(acc, file) {
                return acc + 1;
            }, 0)).on('data', function(count) {
                assert.equal(count, 2);
                step2();
            });

        function step2() {
            touch(path.join(__dirname, 'fixtures/a.txt'), function() {
                gulp.src(path.join(__dirname, 'fixtures/*.txt'))
                    .pipe(modified('text'))
                    .pipe(reduce(function(acc, file) {
                        return acc + 1;
                    }, 0)).on('data', function(count) {
                        assert.equal(count, 1);
                        done();
                    });
            });
        }
    });
});