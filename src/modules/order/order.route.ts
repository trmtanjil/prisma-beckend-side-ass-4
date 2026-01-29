 import express,{ Router } from "express";
import { orderController } from "./order.controller";
 import auth, { UserRole } from "../../middalewared/auth";



const router:Router = express.Router()

router.post(
    "/",
      auth(UserRole.SELLER,UserRole.CUSTOMER),
    orderController.createOrder
)
router.get(
    "/",
     orderController.getAllOrder
)
router.get(
    "/:id",
     orderController.getSingleOrder
)

export const orderRouter:Router = router