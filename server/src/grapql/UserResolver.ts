import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import User from "../models/users/user.model";
import { LoginResponse, MyContext, UserType } from "../types";
import Auth from "../helpers/auth";
import _ from "lodash";
import { isAuth } from "../middlewares/auth.middleware";
@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi !";
  }

  @Query(() => String)
  @UseMiddleware([isAuth])
  bye(@Ctx() { payload }: MyContext) {
    return `Your user id is : ${payload?._id}`;
  }

  @Query(() => UserType)
  @UseMiddleware([isAuth])
  async getProfile(@Ctx() { payload }: MyContext) {
    return await User.getUserById({ _id: payload!._id });
  }

  @Query(() => [UserType])
  async getAllUser() {
    const user = await User.findAll();
    return user;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId") userId: string) {
    console.log(userId);
    const result = await User.updateTokenVersion({ _id: userId });
    return result;
  }

  @Mutation(() => Boolean)
  async register(@Arg("email") email: string, @Arg("password") password: string) {
    const userParams = { email, password };
    try {
      await User.createUser(userParams);
    } catch (e: any) {
      console.log(e);
      return false;
    }
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("email") email: string, @Arg("password") password: string, @Ctx() { res }: MyContext) {
    const user = await User.getUserByEmail({ email });
    if (!user) throw new Error("Could not find a user");

    const { _id, password: encryptedPass, tokenVersion } = _.pick(user, ["_id", "password", "tokenVersion"]);
    const isValidPassword = await User.isValidPassword({ password, encryptedPass });
    if (!isValidPassword) throw new Error("Bad Password");

    let accessToken = Auth.createAccessToken({ _id });
    Auth.setNewRefreshToken(res, _id, tokenVersion);
    return {
      accessToken,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware([isAuth])
  async logout(@Ctx() { res, payload }: MyContext) {
    try {
      Auth.setNewRefreshToken(res, payload!?._id, -1);
      await User.updateTokenVersion({ _id: payload!?._id });
      return true;
    } catch (error) {
      return false;
    }
  }
}
