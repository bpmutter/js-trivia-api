const express = require('express');
const cors = require("cors");

const port = process.env.PORT || 8080;
const apiRouter = require('./routes/api');
const app = express();

app.use(cors());


app.use("/", apiRouter);


app.listen(port, () => console.log(`Listening on port ${port}`));
