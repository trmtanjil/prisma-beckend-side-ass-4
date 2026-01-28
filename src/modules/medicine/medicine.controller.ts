import { Request, Response } from "express";
import { medicineService } from "./medicine.service";
import { UserRole } from "../../middalewared/auth";
import { boolean } from "better-auth";


const createMedicine = async ( req:Request,res:Response)=>{
try{
     const user= req.user
         console.log("user",user)
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
         const user= req.user
        //  console.log("user",user)
           if(!user){
      throw new Error("you are unauthorized ")
    }
          const isSeller = user.role===UserRole.SELLER
      const {medicineId}= req.params
    const result =await medicineService.updateMedicine(medicineId as string,req.body,  user?.id as string,isSeller)
    res.status(200).json(result)

    }catch(error){
        res.status(400).json({
              error:"medicine update faild",
        message:error
        })
    }
}

const deleteMedicine = async (req:Request,res:Response )=>{
try{
     const { medicineId  } = req.params; 
    const user = req.user;    
    const isSeller = user?.role===UserRole.SELLER;
       const result = await medicineService.deleteMedicine(medicineId as string, user?.id as string,isSeller);

      res.status(200).json({
      success: true,
      message: "Medicine removed successfully",
      data: result,
    });


}catch(error){
    res.status(400).json({
        error:"medicine delete faild",
        message:error
    })
}
}

export const medicineController ={
createMedicine,
updateMedicine,
deleteMedicine
}