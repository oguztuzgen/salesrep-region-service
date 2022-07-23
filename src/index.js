const express = require('express')

const pkgJson = require('../package.json')

const countryRouter = require('./routers/countryRouter')
const salesrepRouter = require('./routers/salesrepRouter')

require('./bootstrap/mongoose')

const app = express()
app.use(express.json())

app.use(countryRouter)
app.use(salesrepRouter)

app.listen(process.env.PORT, () => {
  console.log(`${pkgJson.name} version ${pkgJson.version} is running on port ${process.env.PORT}`)
})
