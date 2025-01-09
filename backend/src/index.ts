import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import "reflect-metadata";
import userRoutes from "./routes/userRoutes";
import loginRoutes from "./routes/loginRoutes";
import answerRoutes from "./routes/answerRoutes";
import physicianRoutes from "./routes/physicianRoutes";
import { User } from "./entities/User";
import { Answers } from "./entities/Answers";
import { PatientsScore } from "./entities/PatientsScore";
import { Notes } from "./entities/Notes";
import { Appointment } from "./entities/Appointment";
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
// Database connection configuration
const connectionUrl = process.env.PG_CONNECTION_URL;

// Create DataSource instance (instead of createConnection)
export const dataSource = new DataSource({
  type: "postgres",
  url: connectionUrl,
  entities: [User,Answers,PatientsScore,Notes,Appointment],  // Make sure to add all entities you use
  synchronize: true,  // Use cautiously in production
  logging: false,
  extra: { ssl: true },  // Enable SSL for production
});

async function startServer() {
  try {
    // Initialize the database connection
    await dataSource.initialize();
    console.log("Connected to the database");

    // Start the Express server after the connection is established
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error during DataSource initialization:", error);
  }
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Backend!");
});

app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/answers", answerRoutes);
app.use("/physician", physicianRoutes);

// Start the server
startServer();
