import express, { Router } from "express";
import { medicineController } from "./medicine.controller";
import auth, { UserRole } from "../../middalewared/auth";
import { upload } from "../../middalewared/multer.middleware";
 

const router:Router = express.Router()

router.post(
  "/",
  auth(UserRole.SELLER), // create medicine only seller
  upload.single("image"),
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

export const medicineRouter:Router = router