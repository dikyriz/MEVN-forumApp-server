import express from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  getUser,
} from "../controllers/authController.js";

import { authMiddleware, permisionUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);
router.get("/getUser", authMiddleware, getUser);
router.get("/test", authMiddleware, permisionUser("admin"), (req, res) => {
  res.send("berhasil");
});

export default router;
