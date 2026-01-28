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


export const categoryController = {
createCategory
}