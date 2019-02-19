const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    
    output: {
        filename: 'bundle.[hash].js',
        path: path.join(__dirname, '/dist'),
        publicPath: "/"
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(png|woff|svg|ttf|eot)$/, loader: 'url-loader?limit=10000' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
};
