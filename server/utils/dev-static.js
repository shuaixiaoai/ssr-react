const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

// 动态读取index文件
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:9847/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const Module = module.constructor

const mfs = new MemoryFs()
// 动态生成静态文件， 监听webpack entry下的文件的变化
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  // 读取serverbundle的信息
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  // bundle 文件的输出内容， string内容， 非莫模块
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server-entry.js')           // 以名字存， 名字取
  serverBundle = m.exports.default                // commonjs2 需要module.exports
})

module.exports = (app) => {
  // 静态资源代理到本地服务
  app.use('/public', proxy({
    target: 'http://localhost:9847',
  }))
  app.get('*', (req, res) => {
    getTemplate().then(template => {
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(template.replace('<!-- app -->', content))
    })
  })
}
