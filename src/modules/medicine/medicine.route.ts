import express, { Router } from "express";
import { medicineController } from "./medicine.controller";
import auth, { UserRole } from "../../middalewared/auth";
 

const router:Router = express.Router()

router.post(
  "/",
  auth(UserRole.SELLER), // create medicine only seller
  medicineController.createMedicine
);

router.patch(
  "/:medicineId",
  auth(UserRole.SELLER),
  medicineController.updateMedicine
);
//delete medicine
router.delete(
  "/:medicineId",
  auth(UserRole.SELLER,UserRole.ADMIN),
  medicineController.deleteMedicine
);

export const medicineRouter:Router = router