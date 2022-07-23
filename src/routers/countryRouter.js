const express = require('express')

const Country = require('../models/country')

const router = new express.Router()

router.get('/countries', async (request, response) => {
  try {
    // I am doing the search case-insensitively
    // * region names are both camel case and capital case
    // ! the following piece of code is not really performant but does the trick
    var countries;
    if (request.query.region) {
      countries = await Country.find({'region': {'$regex': request.query.region,$options: 'i'}})
    } else {
      countries = await Country.find({})
    }

    response.send(countries)
  } catch(e) {
    response.status(500).send(e.message)
  }
})

module.exports = router
