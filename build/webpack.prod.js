const path = require('path')
const webpack = require('webpack')
const ZipPlugin = require('zip-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('src/theme.properties');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
    context: path.resolve(__dirname, "../src"),
    entry: './script.js',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, '../dist')

    },
    externals: {},
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        query: {
                            limit: 10000,
                            name: path.posix.join('/node_assets/', 'fonts/[name].[hash:7].[ext]')
                        }
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',

                        useRelativePath: process.env.NODE_ENV === "production"

                    }
                }]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
              test: /\.tsx?$/,
              loader: 'ts-loader',
              exclude: /node_modules/,
              options: {
                appendTsSuffixTo: [/\.vue$/],
              }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*','.ts', '.tsx', '.js', '.vue', '.json']
    },
    performance: {
        hints: false
    },
    plugins: [

        new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '../') }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        extractSass,

        new CopyWebpackPlugin([
            { from: '**/*', ignore: ['*.js', '*.scss'] }
        ]),

        new VueLoaderPlugin(),

        new ZipPlugin({

            filename: properties.get('name') + '.zip',

        })
    ]
}