const path = require('path');
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const devMode = process.argv.indexOf('--mode=production') === -1
const entry = './src/main.js'
module.exports = {
    mode: devMode ? 'development' : 'production',

    entry: path.resolve(__dirname, entry),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/
            })
        ]
    },
    performance: {
        hints: false // 枚举

    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src/'),
        },
        extensions: ['.js', '.jsx', '.json'],
    },
    plugins: devMode ? [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html',
        }),
        new Webpack.HotModuleReplacementPlugin()
    ] : [],
    devServer: {
        port: 3300,
        hot: true,
        client: {
            logging: 'error'
        }
    },
}
