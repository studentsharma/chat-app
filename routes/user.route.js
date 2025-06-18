import express from "express";
import { createUser, getFriends, getUsers, login } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/get-user", getUsers)
router.post("/register-user", createUser)
router.post("/login", login)

export default router;