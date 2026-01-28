import { Medicines } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


interface IMedicinePayload{
name: string;
  price: number;
  stock: number;
  expiryDate: string | Date; // ফ্রন্টএন্ড থেকে স্ট্রিং আসতে পারে
  categoryId: string;        // ক্যাটাগরি টেবিলের ID
  sellerId: string;
}

const createMedicine = async (payload:IMedicinePayload)=>{

    const result = await prisma.medicines.create({
         data: {
      name: payload.name,
      price: payload.price,
      stock: payload.stock,
      // স্ট্রিং ডেটকে প্রিজমার জন্য উপযোগী অবজেক্টে রূপান্তর
      expiryDate: new Date(payload.expiryDate), 
      categoryId: payload.categoryId,
      sellerId: payload.sellerId,
    },
    })
    return result

}

const updateMedicine = async (medicineId:string,data:Partial<Medicines>,sellerId:string,isSeller:boolean)=>{
  const medicineData = await prisma.medicines.findUniqueOrThrow({
    where:{
      id:medicineId
    }
  })
   if(!isSeller && (medicineData.sellerId!==sellerId)){
        throw new Error("you are the not /owner of ther creation post")
    }

    const result = await prisma.medicines.update({
      where:{
        id:medicineData.id
      },
      data
    })
    return result

}

export const medicineService = {
    createMedicine,
    updateMedicine
}