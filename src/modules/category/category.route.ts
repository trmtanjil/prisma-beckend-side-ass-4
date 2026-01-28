import express, { Router } from "express"
import { categoryController } from "./category.controller"

const router:Router = express.Router()


router.post(
    "/",categoryController.createCategory
)



export const categoryRouter:Router = router