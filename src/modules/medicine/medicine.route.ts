import express from "express";
import { medicineController } from "./medicine.controller";
import auth, { UserRole } from "../../middalewared/auth";
 

const router = express.Router()

router.post(
  "/",
  auth(UserRole.SELLER), // create medicine only seller
  medicineController.createMedicine
);
router.get(
  "/",
   medicineController.getAllMedicine
);
router.get(
  "/:id",
   medicineController.getSinglMedicine
);
// router.patch(
//   "/:id",
//    medicineController.getSinglMedicine
// );
router.patch(
  "/:medicineId",
  auth(UserRole.SELLER),
  medicineController.updateMedicine
);



//delete medicine
router.delete(
  "/:id",
  auth(UserRole.SELLER,UserRole.ADMIN),
  medicineController.deleteMedicine
);

export const medicineRouter = router