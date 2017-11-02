var path = require('path');


/***** import webpack.config.js as the base configuration *****/
var prodConfig = require('./webpack.config.js');
devConfig = prodConfig;


/**************** modify the following settings: **************/

// change the destination path of the bundled javascript files
// from ./variora/bundled_static/prod/bundle
// to   ./variora/bundled_static/dev/bundle
devConfig.output.path = path.resolve('./variora/bundled_static/dev/bundle');

// set the mode to watch
// so whenever the files get changed, the bundle will be updated accordingly immediately
devConfig.watch = true

module.exports = devConfig
