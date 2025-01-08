import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes";
import { createConnection } from "typeorm";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Backend!");
});
app.use("/api", userRoutes);

app.listen(PORT, async () => {
  const connectionUrl = "postgres://postgres:TcsvC8wPtcePyy0ke32t@rubixcube-rds.chwmo8ksmmlm.eu-west-2.rds.amazonaws.com:5432/clinical";
  createConnection({
    type: "postgres",
    url: connectionUrl,    
    synchronize: true,    
    logging: false, 
    extra: {ssl: true}      
  })
        .then(async (connection) => {
          console.log("Connected to the database");
        }).catch((error) =>{
          console.log("errror", error);
        })
    console.log(`Server is running on http://localhost:${PORT}`);
});
