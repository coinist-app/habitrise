const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
let bodyParser = require('body-parser');
const indexRouter = require('./routes/index')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})


app.use('/api', indexRouter)
app.get('*', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// TODO: Add your own error handler here.
/*if (process.env.NODE_ENV === 'production') {
  // Do not send stack trace of error message when in production
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send('Error occurred while handling the request.')
  })
} else {
  // Log stack trace of error message while in development
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    console.log(err)
    res.send(err.message)
  })
}*/

app.use(express.static(path.resolve(__dirname, 'public')))

module.exports = app
