import mongoose from 'mongoose'

const { Schema } = mongoose

const countrySchema = new Schema({
  code: Schema.Types.String,
  name: {
    en: Schema.Types.String,
    ka: Schema.Types.String,
  },
  statistics: {
    confirmed: Schema.Types.Mixed,
    recovered: Schema.Types.Number,
    critical: Schema.Types.Number,
    deaths: Schema.Types.Number,
  },
  __v: {
    type: Schema.Types.Number,
    select: false,
  },
})

const Country = mongoose.model('Country', countrySchema)

export default Country
