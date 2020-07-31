const express = require('express');
const port = process.env.PORT || 8080;
const apiRouter = require('./routes/api');

const app = express();

app.use("/", apiRouter);


app.listen(port, () => console.log(`Listening on port ${port}`));
