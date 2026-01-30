import { Request, Response } from "express";
import { reviewService } from "./review.service";


const crateReviw = async (req:Request, res:Response)=>{
    try{
        const reviewData = req.body;
        const userId = req.user!.id

        console.log("user",userId)
        const result = await reviewService.crateReviw(userId, reviewData)

        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: result
        });
    }catch(error){
        res.status(400).json({
            success: false,
            message: error
        });
    }
}


export const reviewController = {
    crateReviw
}