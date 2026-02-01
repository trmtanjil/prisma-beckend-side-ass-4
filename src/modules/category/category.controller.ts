import type { Request, Response as ExpressResponse } from "express";
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: ExpressResponse) => {
  try {
    const result = await categoryService.createCategory(req.body);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "category create failed",
      details: error instanceof Error ? error.message : error,
    });
  }
};

const getAllCategory = async (req: Request, res: ExpressResponse) => {
  try {
    const result = await categoryService.getAllCategory();

    return res.status(200).json({
      success: true,
      message: "category fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : error,
    });
  }
};

export const categoryController = {
  createCategory,
  getAllCategory,
};
