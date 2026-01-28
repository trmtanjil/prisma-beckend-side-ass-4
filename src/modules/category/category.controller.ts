import { Request, Response } from "express";
import { categoryService } from "./category.service";


const createCategory = async (req:Request, res:Response)=>{
 try{
    const result  = await categoryService.createCategory(req.body)
        res.status(201).json(result)
    
 }catch(error){
    res.status(400).json({
        error:"category crate faild",
        details:error
    })
 }
}

const getAllCategory=async(req:Request,res:Response)=>{
try {
    const result = await categoryService.getAllCategory();

    res.status(200).json({
      success: true,
      message: "category fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error   ,
    });
  }
}

export const categoryController = {
createCategory,
getAllCategory
}