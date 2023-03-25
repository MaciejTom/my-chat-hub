const mongoose = require("mongoose");
const connectDB = (url: string) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  });
};

module.exports = connectDB;