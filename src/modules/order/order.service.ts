import { prisma } from "../../lib/prisma";



interface IOrderItemPayload{
medicineId: string;
  quantity: number;
   
}
interface OrderPayload {
  items: IOrderItemPayload[];
}
const createOrder = async (userId: string, payload: OrderPayload)=>{

    return await prisma.$transaction(async(tx)=>{
        let totalOrderAmmount=0;
    const orderItemsData = [];
 
    for(const item of payload.items){
        const medicine = await tx.medicines.findUniqueOrThrow({
            where:{id:item.medicineId}
        });
        console.log("medicin",medicine)
        if(medicine.stock<item.quantity){
            throw new Error(`Insufficient stock for ${medicine.name}`);
        };

        // stock menege 
        await tx.medicines.update({
            where:{id:item.medicineId},
            data:{stock:{decrement:item.quantity}}
        });

        //order ammount count 
        const itemTotal = medicine.price * item.quantity;
        totalOrderAmmount +=itemTotal

        //order item data push 
        orderItemsData.push({
            medicineId:item.medicineId,
            quantity:item.quantity,
            unitPrice :medicine.price
        })
    }

    const newOrder = await tx.orders.create({
        data:{
            customerId:userId,
            totalAmount:totalOrderAmmount,
            orderItems:{
                create:orderItemsData
            }
        },
        include:{orderItems:true}
    })
    return newOrder
    

    })

}


const getAllOrder =async()=>{
    const result = prisma.orders.findMany({
          orderBy: {
      createdAt: 'desc'  
    }
    })
    return result
}

const getSingleOrder =async(orderId:string)=>{
    const result = prisma.orders.findUnique({
         where:{id:orderId}
    })
    return result
}




export const orderservice ={
createOrder,
getAllOrder,
getSingleOrder
}