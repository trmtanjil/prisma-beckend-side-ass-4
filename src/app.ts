
import express,{Application} from "express"
import { categoryRouter } from "./modules/category/category.route";
import { medicineRouter } from "./modules/medicine/medicine.route";

const app: Application = express();
app.use(express.json());

app.use("/category",categoryRouter)

//medicine operation 
app.use("/api/seller/medicines",medicineRouter)


app.get("/",(req,res)=>{
    res.send('hlw world')
})

export default app;