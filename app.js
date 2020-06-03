if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./middleware/errorHandler')
const port = process.env.PORT || 4003;
const router = require('./router/index');
const mongoose = require('mongoose');
const connection = mongoose.connection;

const {jobStart, jobStop} = require("./helpers/cron");

var url = "mongodb://localhost:27017"
var dbName = "productService"

mongoose.connect(url, { 
  dbName: dbName,
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false 
  })

connection.on('error', (err) => {
  console.error(err);
})

connection.once('open', () => {
  console.log('MONGODB SERVER CONNECTED');
  connection.emit('ready')
})

connection.on('ready', () => {
  app.use(cors())
  app.use(express.urlencoded({extended: false}))
  app.use(express.json())
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
  app.use(router)
  app.use(errorHandler)
  jobStart()
  app.listen(port, () => {
		console.log(`LISTENING ON: ${port}`)
	})
})

connection.on('disconnected', function(){
  console.log("Mongoose default connection is disconnected");
  jobStop()
  // job.cancel()
});

module.exports = app