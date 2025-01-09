import express from "express";
import  { getUsersData, addUserData, getUserByEmailData, updatePassword }  from "../controllers/userController";
// import { verifyToken } from "../middleware/validateToken";
import { validateToken } from '../middleware/validateToken';

const router = express.Router();

router.use(validateToken); 

router.get("/users", getUsersData); 
router.post("/createUser", addUserData); 
router.get("/getUserByEmail/:email", getUserByEmailData); 
router.post("/passwordChange", updatePassword); 

export default router;