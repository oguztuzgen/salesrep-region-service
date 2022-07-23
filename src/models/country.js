const mongoose = require('mongoose')

const { Schema } = mongoose

const countrySchema = new Schema({
  name: String,
  region: String,
})

countrySchema.methods.toJSON = function() {
  const country = this.toObject()

  delete country._id
  return country
}

const Country = mongoose.model('Country', countrySchema)

module.exports = Country
