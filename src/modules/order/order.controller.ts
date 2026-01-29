import { Request, Response } from "express";
import { orderservice } from "./order.service";

const createOrder= async (req:Request, res:Response)=>{
    try{
        const user = req.user
         const result = await orderservice.createOrder(user?.id as string, req.body)
        res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: result,
    });

    }catch(error){
          res.status(400).json({
        error:"order create faild",
        message:error
    })
    }
}



export const orderController={
createOrder
}