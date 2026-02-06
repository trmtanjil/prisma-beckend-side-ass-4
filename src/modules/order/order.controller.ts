import { NextFunction, Request, Response } from "express";
import { orderservice } from "./order.service";

const createOrder= async (req:Request, res:Response)=>{
  console.log("Usersdfs:", req.user)
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


const getSellerOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sellerId = req.user!.id; // auth middleware থেকে আসছে

    const result = await orderservice.getSellerOrders(sellerId);

    res.status(200).json({
      success: true,
      message: "Seller orders fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const sellerId = req.user!.id;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Order status is required",
      });
    }

    const result = await orderservice.updateOrderStatus(
      id as string,
      sellerId,
      status
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const orderController={
createOrder,
getAllOrder,
getSingleOrder,
getSellerOrders,
updateOrderStatus
}