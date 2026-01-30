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

const getAllRivew = async (req:Request, res:Response)=>{
   try{
        
 
        const result = await reviewService.getAllReviw()
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: result
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error
        });
    }
}

const getSinglRivew = async (req:Request, res:Response)=>{
   try{
        
  const  {id} = req.params
        const result = await reviewService.getSingReviw(id as string )
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: result
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error
        });
    }
}
const updateRivew = async (req:Request, res:Response)=>{
   try{
        
  const  {id} = req.params
  const user = req.user?.id
        const result = await reviewService.updateReviw(id as string,user as string, req.body)
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: result
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error
        });
    }
}

export const reviewController = {
    crateReviw,
    getAllRivew,
    getSinglRivew,
    updateRivew
}