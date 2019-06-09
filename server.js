const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev }) //dev（bool）是否在开发模式下启动Next.js - 默认false
const handle = app.getRequestHandler()
// 自定义服务器
app
  .prepare()
  .then(() => {
    const server = express()
    //路由掩码 类似于路由拦截  匹配到p的 实际路径是post页面
    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    server.listen(3008, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3008')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
// 自动转换和捆绑（使用webpack和babel）
// 热门代码重装
// 服务器渲染和索引 ./pages
// 静态文件服务。
/*
async prepare () {
    await verifyTypeScriptSetup(this.dir)

    this.hotReloader = new HotReloader(this.dir, {
      config: this.nextConfig,
      buildId: this.buildId
    })
    await super.prepare()
    await this.addExportPathMapRoutes()
    await this.hotReloader.start()
    await this.startWatcher()
    this.setDevReady()
  }

*/
