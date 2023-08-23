const cartItem = require("../model/cartItem");
const CartItem = require("../model/cartItem");

const cartItemController = {
  createCartItem: async (req, res) => {
    try {
      const { itemId, price, area } = req.body;

      // Check if any required field is missing
      if (!itemId || !price || !area) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Check if the item already exists in the cart
        const existingItem = await CartItem.findOne({ itemId });
        console.log(existingItem)

      if (existingItem) {
        // Remove the existing item from the cart
          await CartItem.findByIdAndDelete(existingItem._id);
          return res.status(400).json({ success: "item unselected" });
      }

      // Create a new cart item
      const newItem = await CartItem.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllCartItems: async (req, res) => {
    try {
      const items = await CartItem.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCartItemById: async (req, res) => {
    try {
      const item = await CartItem.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCartItemById: async (req, res) => {
    try {
      const updatedItem = await CartItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteCartItemById: async (req, res) => {
    try {
      const deletedItem = await CartItem.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSubtotal: async (req, res) => {
    try {
      const items = await CartItem.find();
      let subtotal = 0;

      items.forEach((item) => {
        subtotal += item.price;
      });

      const taxRate = 0.1; // 10% tax rate
      const tax = subtotal * taxRate;
      const total = subtotal + tax;

      res.json({ subtotal, tax, total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = cartItemController;
