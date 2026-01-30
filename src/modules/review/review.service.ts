import { prisma } from "../../lib/prisma"



interface ReviewType {
    medicineId: string;
    comment: string;
    rating: number;
}

const crateReviw = async (userId:string, payload:ReviewType)=>{
     const result = await prisma.reviews.create({
    data:{
        comment: payload.comment,
            rating: payload.rating,
            userId: userId,
            medicineId: payload.medicineId
    }       
    })
    return result
}

const getAllReviw = async ()=>{
     const result = await prisma.reviews.findMany({
          orderBy: {
      rating: "desc",  
    },
     })
    return result
}

const getSingReviw = async (medicinId :string)=>{
     const result = await prisma.reviews.findUnique({
     where:{id:medicinId}
    })
    return result
}

export const reviewService ={
    crateReviw,
    getAllReviw,
    getSingReviw
}