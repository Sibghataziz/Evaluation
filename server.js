import express from "express";
import cors from "cors";
import userRouter from "./router/auth.router.js";
import connection from "./configs/db.js";
import checkAuth from "./middleware/checkAuth.js";
import hostelRouter from "./router/hostel.router.js";


const app = express();

app.use(express.json());
app.use(cors());


app.use('/auth', userRouter);
app.use(checkAuth)
app.use('/hostel', hostelRouter);


app.listen(8080, () => {
  connection();
  console.log(`server is running at http://localhost:8080`);
});
