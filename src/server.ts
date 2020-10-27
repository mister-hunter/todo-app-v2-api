console.log('[#server] starting . . .')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const routes = require('./routes')(app)

const server = app.listen(process.env.PORT, () => {
  console.log('[#server] up and running')
})
