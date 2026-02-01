
import express , { Router} from "express"
import { reviewController } from "./review.controller"
import auth, { UserRole } from "../../middalewared/auth"


const router  = express.Router()

router.post(
    "/",
     auth(UserRole.SELLER,UserRole.CUSTOMER),
     reviewController.crateReviw
)
router.get(
    "/",
     
     reviewController.getAllRivew
)
router.get(
    "/:id",
     
     reviewController.getSinglRivew
)
router.patch(
    "/:id",
       auth(UserRole.CUSTOMER,UserRole.SELLER),
     reviewController.updateRivew
)

export const reviewRouter =router