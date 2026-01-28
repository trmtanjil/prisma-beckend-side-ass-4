import { Request, Response } from "express";
import { medicineService } from "./medicine.service";


const createMedicine = async ( req:Request,res:Response)=>{
try{
 const result = await medicineService.createMedicine(req.body)
  res.status(201).json(result)
}catch(error){
    res.status(400).json({
        error:"medicine create faild",
        message:error
    })
}
}


const updateMedicine = async (req:Request, res:Response)=>{
    try{
        const result = await medicineService.updateMedicine
        
    }catch(error){
        res.status(400).json({
              error:"medicine update faild",
        message:error
        })
    }
}

export const medicineController ={
createMedicine,
updateMedicine
}