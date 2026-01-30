
import express , { Router} from "express"
import { reviewController } from "./review.controller"
import auth, { UserRole } from "../../middalewared/auth"


const router:Router = express.Router()

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

export const reviewRouter:Router=router