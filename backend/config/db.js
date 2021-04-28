var mongoose = require('mongoose');
require('dotenv').config()

module.exports = connection = async () => {

  try {
    const res =  await mongoose.connect(process.env.Connection_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected to db")
    mongoose.pluralize(null);
  }
  catch (err) { console.log(err) }
}
