const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
const index = require('./routes/index')
const users = require('./routes/users')

const student = require('./routes/student')
app.use(student.routes(), student.allowedMethods())
const pc = require('./routes/pc')
app.use(pc.routes(), pc.allowedMethods())

const cors = require('koa-cors')
app.use(cors()) //使用cors

// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// error handler
onerror(app)

// middlewares

app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
