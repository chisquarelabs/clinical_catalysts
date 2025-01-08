import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Backend!");
});
app.use("/api", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
