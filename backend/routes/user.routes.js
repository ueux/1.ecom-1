import { Router } from "express";
import { createUser } from "../controllers/user.controllers.js";
const router = Router();

router.route('/signin').post(createUser)

export default router;