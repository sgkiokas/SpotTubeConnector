const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const adminRouter = require('./server/routes/admin');
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(adminRouter);

app.listen(port);