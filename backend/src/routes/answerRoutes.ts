import express from "express";
import  { saveAnswers, getAnswers, getAnswersByCondition}  from "../controllers/answerController";
// import { verifyToken } from "../middleware/validateToken";
import { validateToken } from '../middleware/validateToken';
const router = express.Router();
router.use(validateToken); 
router.post("/", saveAnswers); 
router.get("/", getAnswers);
router.get("/condition/:condition", getAnswersByCondition);


export default router;