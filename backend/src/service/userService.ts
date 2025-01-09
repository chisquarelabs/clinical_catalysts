// import { User } from "../models/user";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { DataSource } from 'typeorm';
import { dataSource } from '../index';
import bcrypt from "bcryptjs";
// let users: User[] = [
//     { id: "1", name: "John Doe", email: "john@example.com", password: "password123" }
// ];



 export const getUsers = (): User[] => {
    let users: User[] = [
    { id: 1, email: "John Doe", password: "john@example.com", f_name: "password123" , l_name: "", otp: 123, role: "", user_id: "PHY001", physician_id: "PHY001", is_first_time: true }
];
    return users;
};

export const addUser = async (userData: Partial<User>): Promise<User> => {
    const userRepository = dataSource.getRepository(User);
    const newUser = userRepository.create(userData); 
    return userRepository.save(newUser);
  }

  export const getUserByEmail = async (email: string): Promise<User | null> => {
    const userRepository = dataSource.getRepository(User);
    return userRepository.findOne({ where: { email } });
  }

  export const updatePasswordByEmail = async (email: string, new_password: string): Promise<User | null> => {
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if(user)
    {
        const hashedPassword = await bcrypt.hash(new_password, 10);
        user.password = hashedPassword;
        return await userRepository.save(user);
    }
    return null;
  } 