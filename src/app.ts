
import express,{Application} from "express"
import { categoryRouter } from "./modules/category/category.route";
import { medicineRouter } from "./modules/medicine/medicine.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { authRoutes } from "./modules/auth/auth.route";
import { orderRouter } from "./modules/order/order.route";
import { userRouter } from "./modules/user/user.route";
const app: Application = express();


app.use(cors({
    origin:process.env.APP_URL|| "http://localhost:3000",
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"] 
}))

app.use(express.json());
//get current user
app.use("/api/auth",authRoutes)
app.all("/api/auth/*splat", toNodeHandler(auth));


app.use("/api/categories",categoryRouter)

//medicine operation 
app.use("/api/seller/medicines",medicineRouter)

//medicine get public
app.use("/api/medicines",medicineRouter)

//ordre route poing 
app.use("/api/order",orderRouter)

// /api/seller/orders seller order get 
app.use("/api/seller/orders",orderRouter)

//all user get admi 
app.use("/api/admin", userRouter);

app.get("/",(req,res)=>{
    res.send('hlw world')
})

export default app;