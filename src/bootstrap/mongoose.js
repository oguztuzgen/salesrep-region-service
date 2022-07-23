const { response } = require('express')
const mongoose = require('mongoose')

const port = process.env.MONGODB_PORT || '27017'
const hostName = process.env.MONGODB_HOST || 'localhost'
const dbName = process.env.MONGODB_DBNAME || ''
const username = process.env.MONGODB_USERNAME || 'admin'
const password = process.env.MONGODB_PASSWORD || 'admin'

console.log(`mongodb://${hostName}:${port}/${dbName}`)

mongoose.connect(`mongodb://${hostName}:${port}/${dbName}`, {
  authSource: 'admin',
  user: username,
  pass: password
}).then((res) => {
  console.log(res.connection.name)
})
