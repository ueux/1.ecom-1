import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/category.controllers.js";

import {onlyForAdmin ,verifyJWT} from "../middlewares/auth.middleware.js";

router.route("/").post(verifyJWT, onlyForAdmin, createCategory);
router.route("/:categoryId").put(verifyJWT, onlyForAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(verifyJWT, onlyForAdmin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;