const express = require('express')
const axios = require('axios')
const { salesrepBalancer, salesrepCounter } = require('../services/salesrepService')

const router = new express.Router()

router.get('/salesrep', async (request, response) => {
  try {
    const apiResponse = await axios.get(
      'http://localhost:3000/countries',
    )

    const { data } = apiResponse

    const salesRepData = salesrepCounter(data)
    response.send(salesRepData)
  } catch (e) {
    console.log(e)
    response.status(500).send(e)
  }
})

router.get('/optimal', async (request, response) => {
  try {
    const apiResponse = await axios.get('http://localhost:3000/countries')

    const { data: countries} = apiResponse
    const salesRepData = salesrepCounter(countries)
    
    const optimalSalesrepDeployment = salesrepBalancer(salesRepData, countries)
    response.send(optimalSalesrepDeployment)
  } catch (e) {
    response.status(500).send(e.message)
  }
})

module.exports = router
