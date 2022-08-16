import { Secret, sign } from "jsonwebtoken";
import { UserParam } from "types";
import { Response } from "express";
import "dotenv/config";
import { ROUTE } from "../utils/constant";
export const Auth = {
  createAccessToken: ({ _id }: UserParam) => {
    return sign({ _id }, process.env.JWT_SECRET_ACCESSTOKEN as Secret, {
      expiresIn: "15m",
    });
  },
  createRefreshToken: ({ _id, tokenVersion }: UserParam) => {
    return sign({ _id, tokenVersion }, process.env.JWT_SECRET_REFRESHTOKEN as Secret, {
      expiresIn: "7d",
    });
  },
  setNewRefreshToken: (res: Response, _id: string, tokenVersion: number) => {
    res.cookie("jid", Auth.createRefreshToken({ _id, tokenVersion }), {
      httpOnly: true,
      path: ROUTE.USER.REFRESH_TOKEN
    });
  },
};

export default Auth;
