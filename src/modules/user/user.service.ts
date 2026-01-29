import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middalewared/auth";

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      // password: false (পাসওয়ার্ড বাদ দেওয়ার জন্য এগুলো সিলেক্ট করো)
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return users;
};

const updateUserStatus=async (
    userId:string, 
    payload: any


    )=>{
    const result = await prisma.user.update({
        where:{
            id:userId
        },
        data:payload
    })
    return result
}
 
export const userService ={
    getAllUsers,
    updateUserStatus
}