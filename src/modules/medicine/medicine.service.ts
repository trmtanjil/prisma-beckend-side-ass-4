 import { Medicines } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


interface IMedicinePayload{
name: string;
  price: number;
  stock: number;
  expiryDate: string | Date; 
  categoryId: string;       
  sellerId: string;
   
}

const createMedicine = async (payload:IMedicinePayload, id: string)=>{

 const result = await prisma.medicines.create({
        data: {
            name: payload.name,
            price: payload.price,
            stock: payload.stock,
            expiryDate: new Date(payload.expiryDate),
            categoryId: payload.categoryId,
            // এখানে sellerId শুধুমাত্র login user এর id
            sellerId: id,
        },
    });
    return result;

}

 


const getAllMedicines = async (minPrice?:number,maxPrice?:number) => {

  const whereCondition :any={ }
  if(minPrice !==undefined || maxPrice!==undefined){
    whereCondition.price={
      gte:minPrice || 0,
      lte:maxPrice || 10000000,
    }
  }
  

  const result = await prisma.medicines.findMany({
   where:whereCondition,
    include: {
      category: true,  
    },
    orderBy: {
      createdAt: 'desc'  
    }
  });
  return result;
};

const getSinglMedicine = async (medicineId:string) => { 
  const result = await prisma.medicines.findUniqueOrThrow({
   where:{
    id:medicineId
   },
   include: {
        category: true,
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

const deleteMedicine = async (
  medicineId: string,
  sellerId: string,
  isSeller: boolean
) => {
  if (!medicineId) {
    throw new Error("Medicine id missing");
  }

  const medicineData = await prisma.medicines.findUnique({
    where: {
      id: medicineId,
    },
    select: {
      id: true,
      sellerId: true,
    },
  });

  if (!medicineData) {
    throw new Error("Medicine not found!");
  }

  // if (!isSeller || medicineData.sellerId !== sellerId) {
  //   throw new Error("You can only delete your own medicines!");
  // }

  const result = await prisma.medicines.delete({
    where: {
      id: medicineId,
    },
  });

  return result;
};

export const medicineService = {
    createMedicine,
    getAllMedicines,
    getSinglMedicine,
    updateMedicine,
    deleteMedicine,
}