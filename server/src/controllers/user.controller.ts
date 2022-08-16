import { Request, Response } from "express";
import Auth from "../helpers/auth";
import { verify } from "jsonwebtoken";
import UserModel from "../models/users/user.model";

const UserController = {
  refreshToken: async (req: Request, res: Response) => {
    const token = req.cookies.jid;
    let response = {
      status: false,
      accessToken: "",
      message: "MISSING_TOKEN",
    };
    if (!token) return res.send(response);

    let payload: any = null;
    try {
      payload = verify(token, process.env.JWT_SECRET_REFRESHTOKEN!);
    } catch (error) {
      response.message = "INVALID_TOKEN";
      return res.send(response);
    }

    const user = await UserModel.getUserById({ _id: payload._id });
    if (!user) {
      response.message = "WRONG_TOKEN";
      return res.send(response);
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      response.message = "WRONG VERSION";
      return res.send(response);
    }

    // update refresh token
    Auth.setNewRefreshToken(res, payload._id, user.tokenVersion);
    // update response
    response.status = true;
    response.accessToken = Auth.createAccessToken({_id: payload._id});
    response.message = "New Access Token";
    console.log(response, 'new refresh token ')
    return res.status(200).json(response);
  },
};

export default UserController;
