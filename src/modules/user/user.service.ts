import { prisma } from "../../lib/prisma";

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


export const userService ={
    getAllUsers
}