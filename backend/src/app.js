require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes');

// Databased
const dbUri = 'mongodb://localhost:27017/todo';
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(dbUri, dbOptions)
  .then(() => console.log('Database connected'))
  .catch((error) => console.log('Databased failed: ', error));

// App
const app = express();

app.use(express.json());
app.use(
  cors({
    exposedHeaders: 'x-auth-token',
  })
);
app.use('/', router);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
