import mongoose from 'mongoose';

const { Schema } = mongoose;

const countrySchema = new Schema({
  code: String,
  name: {
    en: String,
    ka: String,
  },
});

const Country = mongoose.model('Country', countrySchema);

export default Country;
