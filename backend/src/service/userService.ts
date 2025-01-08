import { User } from "../models/user";

let users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", password: "password123" }
];

export const getUsers = (): User[] => {
    return users;
};