import express from "express";
import cors from "cors";
import userRouter from "./router/auth.router.js";
import connection from "./configs/db.js";
import checkAuth from "./middleware/checkAuth.js";
import hostelRouter from "./router/hostel.router.js";


const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
  return res.send("<h1>Welcone to Hostel Management</h1>")
})
app.use('/auth', userRouter);
app.use(checkAuth)
app.use('/hostel', hostelRouter);

const port = process.env.PORT || 8080

app.listen(port, () => {
  connection();
  console.log(`server is running at http://localhost:${port}`);
});
