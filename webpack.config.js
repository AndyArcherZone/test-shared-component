const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = (env, argv) => {
    const isProduction = argv.mode === 'production'

    return {
        entry: isProduction ? path.join(__dirname, './src/export.js') : path.join(__dirname, './src/index.js'),
        output: isProduction ? {
            path: path.join(__dirname, './build'),
            filename: 'index.js',
            library: 'custom-header',
            libraryTarget: 'umd',
            publicPath: '/build/',
            umdNamedDefine: true
        } : {
                path: path.resolve(__dirname, 'build'),
                filename: 'bundle.js'
            },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: 'eslint-loader',
                    exclude: /node_modules/,
                    enforce: 'pre',
                },
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.svg$/,
                    use: 'file-loader'
                }
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                appMountId: 'root',
                filename: '/static/index.html'
            }),
            new MiniCssExtractPlugin(),
            new CleanWebpackPlugin()
        ],
        externals: isProduction ? {
            // Don't bundle react or react-dom
            react: 'react',
            "react-dom": 'react-dom',
        } : {},
        devServer: {
            contentBase: [
                path.join(__dirname, 'public'),
            ],
            watchContentBase: true,
            hot: true,
            stats: 'errors-only',
            disableHostCheck: true,
        },
    }
}

module.exports = config
