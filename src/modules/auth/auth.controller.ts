import { Request, Response } from "express";
import { auth } from "../../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
 
const getMe = async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No session found",
      });
    }

    res.status(200).json({
      success: true,
      data: session, // user session data 
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    // ১. কুকি থেকে রিফ্রেশ টোকেন বা এক্সেস টোকেন মুছে ফেলা
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // তোমার ফ্রন্টএন্ড এবং ব্যাকএন্ড আলাদা ডোমেইন হলে এটি জরুরি
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};


export const authController = {
  getMe,
  logout
};