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


const getAllMedicines = async () => {
  const result = await prisma.medicines.findMany({
   
    include: {
      category: true,  
    },
    orderBy: {
      createdAt: 'desc'  
    }
  });
  return result;
};

const updateMedicine = async (
  medicineId: string,
  data: Partial<Medicines>,
  userId: string,
  isSeller: boolean
) => {
  const medicineData = await prisma.medicines.findUniqueOrThrow({
    where: { id: medicineId }
  });

   if (!isSeller && medicineData.sellerId !== userId) {
    throw new Error("You are not the owner of this medicine post");
  }

  const result = await prisma.medicines.update({
    where: { id: medicineId },
    data
  });
  
  return result;
};

const deleteMedicine= async(medicineId: string, sellerId: string,isSeller:boolean)=>{
 
  const medicineData = await prisma.medicines.findUnique({
    where:{
      id:medicineId 
    },
    select: { 
        id: true, 
      sellerId: true 
    },
  })
  if (!medicineData) {
    throw new Error("Medicine not found!");
  }
 if (medicineData.sellerId !== sellerId) {
    throw new Error("You can only delete your own medicines!");
  }
  if(!isSeller && (medicineData.sellerId !==sellerId)){
        throw new Error("you are the not /owner of ther creation post")
    }
   const result = await prisma.medicines.delete({
    where: { id: medicineId },
  });
    return result
}

export const medicineService = {
    createMedicine,
    getAllMedicines,
    updateMedicine,
    deleteMedicine,
}