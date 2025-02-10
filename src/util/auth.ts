import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "secret";

interface JwtPayload {
  userId: number;
}

export function validateToken(req: NextApiRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Authorization header missing");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Token not provided");
  }

  try {
    console.log("token", token);
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return payload.userId;
  } catch (error) {
    throw new Error(`Invalid or expired token ${error}`);
  }
}
