import { Router } from "express";
import { getAllUsers, createUser, loginUser, logoutUser } from "../controllers/user.controllers.js";

import { onlyForAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/signin').post(createUser)
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/").get(verifyJWT,onlyForAdmin,getAllUsers)

export default router;