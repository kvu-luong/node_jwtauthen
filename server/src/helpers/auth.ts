import { sign } from "jsonwebtoken";
import { UserParam } from "types";
import { Response } from "express";
import "dotenv/config";
export const Auth = {
  createAccessToken: ({ _id }: UserParam) => {
    return sign({ _id }, process.env.JWT_SECRET_ACCESSTOKEN!, {
      expiresIn: "15m",
    });
  },
  createRefreshToken: ({ _id, tokenVersion }: UserParam) => {
    return sign({ _id, tokenVersion }, process.env.JWT_SECRET_REFRESHTOKEN!, {
      expiresIn: "7d",
    });
  },
  setNewRefreshToken: (res: Response, _id: string, tokenVersion: number) => {
    res.cookie("jid", Auth.createRefreshToken({ _id, tokenVersion }), {
      httpOnly: true,
    });
  },
};

export default Auth;
