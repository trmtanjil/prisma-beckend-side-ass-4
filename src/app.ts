
import express,{Application} from "express"
import { categoryRouter } from "./modules/category/category.route";
import { medicineRouter } from "./modules/medicine/medicine.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app: Application = express();
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));


app.use("/category",categoryRouter)

//medicine operation 
app.use("/api/seller/medicines",medicineRouter)


app.get("/",(req,res)=>{
    res.send('hlw world')
})

export default app;