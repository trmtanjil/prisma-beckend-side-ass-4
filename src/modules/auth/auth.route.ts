import express from "express";
import { authController } from "./auth.controller";
import auth from "../../middalewared/auth";
 
const router = express.Router();

router.get("/me", authController.getMe);
// /api/auth/logout
router.post(
  "/logout",
  auth(), // নিশ্চিত করো ইউজার লগইন অবস্থায় আছে
  authController.logout
);

export const authRoutes = router;