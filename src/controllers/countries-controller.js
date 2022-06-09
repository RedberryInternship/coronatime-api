const { Country } = require('../models/index')

const getAllCountries = async (req, res) => {
  const data = await Country.find()
  res.json(data)
}

module.exports = {
  getAllCountries,
}
