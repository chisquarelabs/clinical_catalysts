import { Request, Response } from "express";
import {
  getUsers,
  addUser,
  getUserByEmail,
  updatePasswordByEmail,
} from "../service/userService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsersData = async (req: Request, res: Response) => {
  const users = getUsers();
  res.status(200).json(users);
};

export const addUserData = async (req: Request, res: Response) => {
  const userData = req.body;
  const newUser = await addUser(userData);
  res.status(201).json(newUser);
};

export const getUserByEmailData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.params;
  const user = await getUserByEmail(email);
  if (user) {
    res.status(200).json(user); // Return the user if found
  } else {
    res.status(404).json({ message: "User not found" }); // Handle user not found
  }
};
export const login = async (req: Request, res: Response) => {
  const secretKey = process.env.SECRET;
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "k&F7@!J$8WvPn^mLtYr9z%",
      { expiresIn: "30m" }
    );
    isMatch
      ? res.status(200).json({ token, user })
      : res.status(500).json("INVALID_PASSWORD");
  } else {
    res.status(404).json({ message: "User not found" }); // Handle user not found
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const { id, new_password } = req.body.data;
  const newUser = await updatePasswordByEmail(id, new_password);
  res.status(201).json(newUser);
};
