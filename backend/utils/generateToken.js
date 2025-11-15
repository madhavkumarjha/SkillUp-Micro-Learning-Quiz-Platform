import jwt from "jsonwebtoken";
export const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing in environment variables");
    process.exit(1);
  }
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};