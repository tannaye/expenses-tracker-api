import jwt from "jsonwebtoken";
import { addMinutes } from "./helpers.js";

export function generateJwtToken(data) {
  const exp = addMinutes(new Date(), 60);
  return jwt.sign(
    {
      ...data,
      exp: exp.getTime() / 100,
    },
    process.env.JWT_SECRET
  );
}

export const tokenVerifier = async (authToken) => {
  const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

  return decoded;
};
