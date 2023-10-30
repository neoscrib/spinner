import * as path from 'path';
import * as webpack from 'webpack';

// tslint:disable:no-var-requires
const HtmlWebpackPlugin  = require('html-webpack-plugin');

const APP_ENV = process.env.APP_ENV;
console.log(`APP_ENV: ${APP_ENV}`);
const prod = APP_ENV === 'production';

const name = 'picker-wheel';
const context = path.resolve(__dirname, 'src');
const resolve = path.resolve(__dirname, 'node_modules');

const config: webpack.Configuration = {
    context,
    entry: './index.tsx',
    mode: prod ? 'production' : 'development',
    output: {
        path: path.resolve('./build'),
        publicPath: '/',
        devtoolModuleFilenameTemplate: `webpack:///${name}/[resource-path]`,
        filename: 'index.js',
        chunkFilename: '[name].index.js'
    },
    resolve: {
        modules: [ resolve ],
        extensions: [ '.ts', '.tsx', '.js' ]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: [ 'ts-loader' ] },
            { test: /\.(woff|woff2|ttf|otf|eot|svg|jpg|jpeg|png|webp)$/, use: [ 'url-loader' ] },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64:5]',
                                exportLocalsConvention: 'camelCaseOnly'
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    devtool: prod ? undefined : 'source-map',
    plugins: [
        new HtmlWebpackPlugin({ title: 'Spinner', inject: 'head', template: '../index.html' })
    ]
};

export default config;
