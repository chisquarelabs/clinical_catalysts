import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = "k&F7@!J$8WvPn^mLtYr9z%"; // Replace with your actual secret key

export const validateToken = (req: Request, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header is missing or invalid" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        // req.user = decoded; // Optionally attach the decoded payload to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
