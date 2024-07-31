const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config(); // For environment variables

const connectDB = require('./db/db.js');
const User = require('./Model/model.js');
const Vendor = require('./Model/purchase_model.js');
const login = require('./controlers/logincontrol.js');
const { addVendor } = require('./controlers/purcontrol.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet()); // Adding security headers

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.post('/login', login);
  app.post('/vendors', addVendor);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
