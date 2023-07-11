const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const history = require('connect-history-api-fallback')

require('dotenv').config()

const app = express()
app.use(history())
app.use(serveStatic(path.join(__dirname, 'dist')))

app.listen(process.env.VUE_APP_PORT, () => {
  console.log(`Server listening on port ${process.env.VUE_APP_PORT}!`)
})