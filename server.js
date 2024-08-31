const express = require('express');
const cors = require('cors');
const connectDB = require('./db/database');
const purchaseRoutes = require('./router/purrouter');
const salesRoutes = require('./router/salrouter');
const billRoutes = require('./router/generate');
const itemPurchaseRoutes = require('./router/itemPurchaseRouter');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.use('/api/vendors', purchaseRoutes);
    app.use('/api/sales', salesRoutes);
    app.use('/api/bill', billRoutes);
    app.use('/api/itempurchases', itemPurchaseRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
