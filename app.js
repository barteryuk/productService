// require('dotenv').config()

const env = process.env.NODE_ENV 
console.log(process.env.NODE_ENV +  "INI ENV SKRG!")
switch (env) {
  case 'development':
    require('dotenv').config({path: process.cwd() + '/.env'});
      break;
  case 'test':
    console.log("MASUK INI TEST");
    require('dotenv').config({path: process.cwd() + '/.env.test'});
      break;
}


const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const port = process.env.PORT || 4002;
const router = require('./router/index');
const mongoose = require('mongoose');
const connection = mongoose.connection;

url = process.env.DBURL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

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
  app.listen(port, () => {
		console.log(`LISTENING ON: ${port}`)
	})
})