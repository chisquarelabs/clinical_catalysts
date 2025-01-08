import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];  // Extract token from "Bearer {token}"

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

    // Attach the decoded data to the request object
    // req.user = decoded;  // You can now access req.user in your route handlers
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
