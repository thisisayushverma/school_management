import express from "express"
import dotenv from "dotenv"

const app = express();

dotenv.config({
  path:'./env'
})



app.use(express.json());



import router from "./router/school.route.js"
app.use("/schools", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
