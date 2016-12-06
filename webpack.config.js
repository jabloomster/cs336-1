var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [    //source code modules
    __dirname + '/app/scripts/index.js'
    ],
    output: {       //destination for bundle
        path: __dirname + '/dist',
        filename: '/bundle.js'
    },
    module: {       
        loaders: [  //preprocessors
        { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.css$/,  loader: 'style!css?modules!postcss' }
        ]
    },
    plugins: [
    new HtmlWebpackPlugin({template: __dirname + "/app/index.tmpl.html"}),
    new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3001,
        proxy: { '/api/*': 'http://localhost:3000' },
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};