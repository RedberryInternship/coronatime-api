import { Country } from '../models/index.js'

export const getAllCountries = async (_, res) => {
  const data = await Country.find()
  res.json(data)
}
