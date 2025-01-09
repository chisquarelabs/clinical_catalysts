import { Request, Response } from "express";
import  { addAnsers }  from "../service/answersService";

type Answer = {
    value: string;
    timestamp: number;
  };

export const saveAnswers = async (req: Request, res: Response) => {
   const answers = req.body.answers;
   const user_ID = req.body.userId;
   Object.entries(answers).forEach(async ([key, value]) => {
    const { value: answerValue, timestamp } = value as Answer;
  const answer = {
    userId: user_ID,
    questionId: key,
    response: answerValue,
  };
  const data = await addAnsers(answer); 
});
    res.status(201).json("DATA SAVED");
};