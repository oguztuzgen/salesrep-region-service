function salesrepCounter(countries) {
  const regions = getRegions(countries)
  const salesrepData = []
  Object.keys(regions).forEach((region) => {
    salesrepData.push({
      region: region,
      minSalesReq: Math.ceil(regions[region]/7),
      maxSalesReq: Math.floor(regions[region]/3),
    })
  })
  return salesrepData
}

function salesrepBalancer(salesrepData, countries) {
  const salesReps = []
  const regions = Object.keys(getRegions(countries))

  regions.forEach((region) => {
    const countriesInRegion = getCountriesInRegion(countries, region)
    const optimalSalesRep = getMinimumRequiredSalesrep(salesrepData, region)
    const countryPerSalesRep = Math.floor(countriesInRegion.length / optimalSalesRep)

    // assign the bulk of the countries to salesreps
    for (var i = 0; i < optimalSalesRep; i++) {
      salesReps.push({
        region: region,
        countryList: countriesInRegion.slice(i * countryPerSalesRep, (i+1) * countryPerSalesRep),
        countryCount: countryPerSalesRep,
      })
    }

    // scatter the remainder of the countries to other salesReps in the same region
    for (var i = 0; i < countriesInRegion.length - (optimalSalesRep * countryPerSalesRep); i++) {
      salesReps[salesReps.length - i - 1].countryList.push(countriesInRegion[(optimalSalesRep * countryPerSalesRep)+i])
      salesReps[salesReps.length - i - 1].countryCount++
    }
  })

  return salesReps
}

function getRegions(countries) {
  const regions = {}
  countries.forEach(country => {
    if (regions[country.region.toLowerCase()] !== undefined) {
      regions[country.region.toLowerCase()] += 1
    } else {
      regions[country.region.toLowerCase()] = 1
    }
  });
  return regions
}

function getMinimumRequiredSalesrep(salesRepData, region) {
  for (var i = 0; i < salesRepData.length; i++) {
    const salesrep = salesRepData[i]

    if (salesrep.region.toLowerCase() === region.toLowerCase()) {
      return salesrep.minSalesReq
    }
  }
  return -1
}

function getCountriesInRegion(countries, region) {
  const countriesInRegion = []
  countries.forEach((country) => {
    if (country.region.toLowerCase() === region.toLowerCase()) {
      countriesInRegion.push(country.name)
    }
  })
  return countriesInRegion
}

module.exports = { salesrepCounter, salesrepBalancer }
