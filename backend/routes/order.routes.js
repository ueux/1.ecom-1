import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/order.controller.js";
import { onlyForAdmin, verifyJWT } from "../middlewares/auth.middleware.js";


router
  .route("/")
  .post(verifyJWT, createOrder)
  .get(verifyJWT, onlyForAdmin, getAllOrders);

router.route("/mine").get(verifyJWT, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
router.route("/:id").get(verifyJWT, findOrderById);
router.route("/:id/pay").put(verifyJWT, markOrderAsPaid);
router.route("/:id/deliver").put(verifyJWT, onlyForAdmin, markOrderAsDelivered);

export default router;