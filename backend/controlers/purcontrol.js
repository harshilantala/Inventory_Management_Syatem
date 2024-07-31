const Vendor = require('../Model/purchase_model');
const { validationResult } = require('express-validator');

const addVendor = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create a new vendor instance
    const vendor = new Vendor(req.body);

    // Save the vendor to the database
    await vendor.save();

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "Vendor added successfully",
      data: vendor
    });
  } catch (error) {
    // Log and respond with error
    console.error("Error adding vendor: " + error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add vendor",
      error: error.message
    });
  }
};

module.exports = { addVendor };
