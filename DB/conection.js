const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose.connect(DB).then((res) => {
  console.log("connection done");
});
//middelwear
