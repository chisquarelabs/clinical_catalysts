import { Request, Response } from "express";
import * as userService from "../service/userService";

export const getUsers = (req: Request, res: Response) => {
    const users = userService.getUsers();
    res.status(200).json(users);
};