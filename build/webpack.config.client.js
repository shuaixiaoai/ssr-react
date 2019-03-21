const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    // mode: 'development',
    entry: {
        app: path.join(__dirname, '../client/app.js'),
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/',             // 引用静态资源的前缀
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: 'babel-loader', 
            },
            {
                test: /.js$/,
                loader: 'babel-loader', 
                exclude: [
                    path.join(__dirname, '../node_module'),
                ]
            },
        ]
    },
    plugins: [
        // 生成html， 并且把entry生成的js注入html
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html'),
        }),
    ]
}

if (isDev) {
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js'),
        ]
    }
    config.devServer = {
        host: '0.0.0.0',        // localhost/127.0.0.1   其他机子是不可通过ip访问的
        port: '9847',
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        overlay: {
            errors: true,
        },
        publicPath: '/public/',              // 对应上面的output的puclicPath
        historyApiFallback: {
            // 所有404的请求都会返回这个地址
            index: '/public/index.html',
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}


module.exports = config