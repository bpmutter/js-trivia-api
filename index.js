// set up -----------------------------------------------------

const express = require("express");
const app = express();
const mongoose = require("mongodb");
const port = process.env.PORT || 8080;
const database = require('./config/database')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require("cors");

// configuration ----------------------------------------------
mongoose.connect(database.remoteUrl)
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// routes -----------------------------------------------------
require("./routes/api")(app);


// listen -----------------------------------------------------

app.listen(port, () => console.log(`Listening on port ${port}`));
