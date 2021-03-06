const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './uncompressed/js/main.js',
        'audio-shortcode': './uncompressed/js/audio-module-shortcode.js'
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/[name].js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env'],
                    plugins: [
                        [
                            'prismjs',
                            {
                                languages: ['javascript', 'css', 'markup', 'php', 'bash'],
                                plugins: ['line-numbers'],
                                theme: 'tomorrow',
                                css: true
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.(scss|css|sass)$/,
                use: [
                    // // fallback to style-loader in development
                    // process.env.NODE_ENV !== 'production'
                    //     ? 'style-loader'
                    //     : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    // 'resolve-url-loader',
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: 'icons/iconsprite.svg.php',
                            path: path.resolve(__dirname, 'assets')
                        }
                    },
                    'svgo-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // path: path.resolve(__dirname, 'assets/css'),
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            path: path.resolve(__dirname, 'assets/css'),
            filename: 'app.css',
            chunkFilename: '[id].css'
        }),
        new SpriteLoaderPlugin(),
        new CopyWebpackPlugin([{ from: 'uncompressed/images', to: 'images' }])
    ]
};
