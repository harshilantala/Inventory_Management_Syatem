// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/database.js');
const login = require('./controlers/logincontrol.js');
const { addVendor } = require('./controlers/purcontrol.js');
const customer = require('./controlers/salescontrol.js');
const { addItemPurchase } = require('./controlers/ItemPurchaseController.js');

const purchaseRoutes = require('./router/purrouter.js');
const salesRoutes = require('./router/salrouter.js');
const billRoutes = require('./router/generate.js');
const ItemPurchaseRoutes = require('./router/ItemPurchaseRouter.js');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.use('/api/vendors', purchaseRoutes); // Ensure correct path
    app.use('/api/sales', salesRoutes);
    app.use('/api/bill', billRoutes);
    app.use('/api/itempurchases', ItemPurchaseRoutes);

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
