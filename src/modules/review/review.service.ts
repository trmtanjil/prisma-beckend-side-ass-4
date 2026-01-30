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



export const reviewService ={
    crateReviw
}