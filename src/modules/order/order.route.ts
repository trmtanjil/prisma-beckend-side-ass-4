 import express  from "express";
import { orderController } from "./order.controller";
 import auth, { UserRole } from "../../middalewared/auth";



const router = express.Router()

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
// /api/seller/orders
router.get(
  "/", 
  auth(UserRole.SELLER), 
  orderController.getSellerOrders
);

router.patch(
  "/:id",
  auth(UserRole.SELLER),
  orderController.updateOrderStatus
);

export const orderRouter = router