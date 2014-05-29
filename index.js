
var through = require('through2');
var caches = {};

function modified(name) {
    if (!caches[name]) {
        caches[name] = {};
    }

    var cache = caches[name];

    return through.obj(function(file, enc, callback) {
        if (file.isNull() || !(file.path in cache) || (file.stat.mtime > cache[file.path])) {
            if (!file.isNull()) {
                cache[file.path] = +file.stat.mtime;
            }
            return callback(null, file);
        }
        callback();
    });
}

function forget(name, path) {
    if (name in caches) {
        delete caches[name][path];
    }
}

module.exports = modified;
module.exports.forget = forget;
