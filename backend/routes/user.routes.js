import { Router } from "express";
import { getAllUsers,updateUserData,getUserProfile, createUser, loginUser, logoutUser, changeCurrentPassword } from "../controllers/user.controllers.js";

import { onlyForAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/signin').post(createUser)
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/").get(verifyJWT,onlyForAdmin,getAllUsers)
router.route("/profile").get(verifyJWT, getUserProfile).post(verifyJWT, updateUserData)
router.route("/password").post(verifyJWT,changeCurrentPassword)

export default router;