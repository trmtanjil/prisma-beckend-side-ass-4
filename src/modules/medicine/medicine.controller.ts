import { Request, Response } from "express";
import { medicineService } from "./medicine.service";
import { UserRole } from "../../middalewared/auth";
import { boolean } from "better-auth";


const createMedicine = async ( req:Request,res:Response)=>{
try{
     const user= req.user
 const result = await medicineService.createMedicine(req.body)
  res.status(201).json(result)
}catch(error){
    res.status(400).json({
        error:"medicine create faild",
        message:error
    })
}
}

const getAllMedicine=async(req:Request,res:Response)=>{
try {
  const {minPrice, maxPrice }= req.query
    const result = await medicineService.getAllMedicines(
      minPrice? Number(minPrice):undefined,
      maxPrice ? Number(maxPrice):undefined
    );

    res.status(200).json({
      success: true,
      message: "Medicines fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch medicines",
    });
  }
}

const getSinglMedicine = async (req:Request,res:Response)=>{
    try {
        const {id}= req.params
     const result = await medicineService.getSinglMedicine(id as string);

    res.status(200).json({
      success: true,
      message: "single Medicines fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error || "Failed to fetch single medicines",
    });
  }
}


const updateMedicine = async (req:Request, res:Response)=>{
    try{
         const user= req.user
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

const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Medicine id is required",
      });
    }

    const user = req.user!;
    const isSeller = user.role === UserRole.SELLER;

    const result = await medicineService.deleteMedicine(
      id as string,
      user.id,
      isSeller
    );

    res.status(200).json({
      success: true,
      message: "Medicine removed successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Medicine delete failed",
    });
  }
};

export const medicineController ={
createMedicine,
getAllMedicine,
getSinglMedicine,
updateMedicine,
deleteMedicine
}