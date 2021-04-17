const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection stablished");
  })
  .catch((err) => {
    console.log(`Error while connecting to database: ${err}`);
  });

module.exports = mongoose;
