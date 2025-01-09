import express from "express";
import  { saveAnswers }  from "../controllers/answerController";
// import { verifyToken } from "../middleware/validateToken";
import { validateToken } from '../middleware/validateToken';
const router = express.Router();
router.use(validateToken); 
router.post("/", saveAnswers); 


export default router;