const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(
    webpack(config),
    {
        publicPath: config.output.publicPath,
        hot: true
        // quiet: false,
        // noInfo: false,
        // historyApiFallback: true
    }
).listen(
    8080,
    '0.0.0.0',
    function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log('Listening at 0.0.0.0:8080');
    }
);
