import { number } from "better-auth";
import { Medicines } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


// interface IMedicinePayload{
// name: string;
//   price: number;
//   stock: number;
//   expiryDate: string | Date; 
//   categoryId: string;       
//   sellerId: string;
//   image:string
  
// }

// const createMedicine = async (payload:IMedicinePayload)=>{

//     const result = await prisma.medicines.create({
//          data: {
//       name: payload.name,
//       price: payload.price,
//       stock: payload.stock,
//       // স্ট্রিং ডেটকে প্রিজমার জন্য উপযোগী অবজেক্টে রূপান্তর
//       expiryDate: new Date(payload.expiryDate), 
//       categoryId: payload.categoryId,
//       sellerId: payload.sellerId,
//       image: payload.image
//     },
//     })
//     return result

// }










interface IMedicinePayload{
name: string;
  price: string;
  stock: string;
  expiryDate: string | Date; 
  categoryId: string;       
  sellerId: string;
  image:string
  
}


const createMedicine = async (payload: IMedicinePayload) => {
    // ডাটাবেসে সেভ করার আগে টাইপ কনভার্ট করে নাও
    const result = await prisma.medicines.create({
        data: {
            name: payload.name,
            price: parseFloat(payload.price), // string কে number করো
            stock: parseInt(payload.stock),   // string কে integer করো
            expiryDate: new Date(payload.expiryDate), // ISO Date ফরম্যাট লাগবে (যেমন: 2026-10-10)
            categoryId: payload.categoryId,
            sellerId: payload.sellerId, // এটি নিশ্চিত করো controller থেকে আসছে
            image: payload.image 
        },
    });
    return result; 
};















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