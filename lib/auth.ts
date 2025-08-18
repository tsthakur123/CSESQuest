import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateJWT(payload: object): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
}


// Type-safe verify
export function verifyJWT(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
