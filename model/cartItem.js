const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  itemId: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
