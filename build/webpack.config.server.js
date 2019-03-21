const path = require('path')

module.exports = {
    target: 'node',
    // mode: 'development',
    entry: {
        app: path.join(__dirname, '../client/server-entry.js'),
    },
    output: {
        filename: 'server-entry.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public',             // 引用静态资源的前缀
        libraryTarget: 'commonjs2',
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
}