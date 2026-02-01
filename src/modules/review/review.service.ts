import { prisma } from "../../lib/prisma"



interface ReviewType{
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

const getSingReviw = async (reviewId :string)=>{
     const result = await prisma.reviews.findUnique({
     where:{id:reviewId}
    })
    return result
}
const updateReviw = async (
    reviewId :string,
    userId:string,
    payload:{
        comment:string;
        rating:number;
    }
)=>{
     const reviewData = await prisma.reviews.findUniqueOrThrow({
     where:{id:reviewId}
    })

    // owner check 
    if(reviewData.userId !== userId){
        throw new Error("You can only update your own review");
    }

    const result = prisma.reviews.update({
        where:{
            id:reviewId
        },
        data :payload
    })
    return result
}

export const reviewService ={
    crateReviw,
    getAllReviw,
    getSingReviw,
    updateReviw
}