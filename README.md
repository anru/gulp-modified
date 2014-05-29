# gulp-modified

Passthrough only changed files

# Usage

This keeps an in-memory modification time of files that have passed through it.
If a file with same mtime has already passed through on the last run it will not be passed downstream. 

# API

## modified(cacheName)

Creates transforming stream.

## modified.forget(cacheName, filePath)

Clear cache for specified cacheName, filePath pair.
