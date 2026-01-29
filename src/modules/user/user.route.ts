import auth, { UserRole } from "../../middalewared/auth";
import { userController } from "./user.controller";
 import express,{ Router } from "express";
const router:Router = express.Router()
 

// /api/admin/users
router.get(
  "/users", 
  auth(UserRole.ADMIN), // শুধুমাত্র অ্যাডমিন এক্সেস পাবে
  userController.getAllUsers
);

router.patch(
  "/:id", 
  auth(UserRole.ADMIN), // শুধুমাত্র অ্যাডমিন এক্সেস পাবে
  userController.updateUserStatus
);
export const userRouter:Router = router