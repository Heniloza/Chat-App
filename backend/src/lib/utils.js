import JWT from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = JWT.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV != "development",
  });
  return token;
};
