# gulp-dbust - A gulp plugin for [dbust](https://www.npmjs.com/package/dbust)
Use after [gulp-rev](https://www.npmjs.com/package/gulp-rev) to save the cache-busted filename to a json file. Deletes old cache-busted files.

## Usage

```js
const gulp = require('gulp')
const rev = require('gulp-rev')
const dbust = require('gulp-dbust')

// Define task to bust js files
gulp.task('js', () => {
  return gulp.src('./source/js/main.js')
    .pipe(rev())
    .pipe(dbust(options))
    .pipe(gulp.dest('./public/js/'))
})

// Run dbust.save after array of tasks is done
gulp.task('default', [ 'js' ], dbust.save)
```
```
$ cat manifest.json
{"main.js":main-hashoffile.js}
```

## Options
Accepts an object containing options. For a list of options see https://www.npmjs.com/package/dbust#options

## Upgrading to 2.x.x
The 2.x version of this plugin uses dbust 3.x which means we have to tell it to save after we're done. This is done to prevent multiple write to a manifest file in a short amount of time such as with gulp + webpack.
All you have to do to make this change is run `dbust.save` after running all your tasks. Do this like the example above or using [run-sequence](https://www.npmjs.com/package/run-sequence).

## Why
Here are two reasons to use this plugin over `rev.manifest()`:
1. Deletes old files
1. Locks manifest file for writing (I have had problems with `rev.manifest()` overwriting certain values if the function is called twice in quick succession)

No offence is meant here. Use whatever floats your goat.

## Testing
```
npm test
```

## See also
1. [gulp-rev](https://www.npmjs.com/package/gulp-rev)
1. [dbust](https://www.npmjs.com/package/dbust)
1. [webpack-dbust](https://www.npmjs.com/package/webpack-dbust)

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
