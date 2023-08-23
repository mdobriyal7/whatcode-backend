const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.route("/").post(cartController.createCartItem);
router.route("/").get(cartController.getAllCartItems);
router.route("/total").get(cartController.getSubtotal);
router.route("/:id").get(cartController.getCartItemById);
router.route("/:id").delete(cartController.deleteCartItemById);


module.exports = router;