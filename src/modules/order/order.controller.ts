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

const getAllOrder = async (req:Request, res:Response)=>{
    try{
        const result = await orderservice.getAllOrder()

         res.status(200).json({
      success: true,
      message: "order fetched successfully",
      data: result,
    });
    }catch(error){
          res.status(400).json({
        error:"get all order faild",
        message:error
    })
    }
}


const getSingleOrder = async (req:Request, res:Response)=>{
    try{
       const {id}=req.params
        const result = await orderservice.getSingleOrder(id as string)

         res.status(200).json({
      success: true,
      message: "order fetched successfully",
      data: result,
    });
    }catch(error){
          res.status(400).json({
        error:"get single order faild",
        message:error
    })
    }
}



export const orderController={
createOrder,
getAllOrder,
getSingleOrder
}