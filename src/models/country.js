const mongoose = require('mongoose')

const { Schema } = mongoose

const countrySchema = new Schema({
  name: String,
  region: String,
})

const Country = mongoose.model('Country', countrySchema)

module.exports = Country
