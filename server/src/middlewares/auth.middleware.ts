import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) throw new Error("not authenticated");

  try {
    // bearer token
    const token = authorization.split(" ")[1];
    const payload = verify(token!, process.env.JWT_SECRET_ACCESSTOKEN!);
    console.log(payload);
    context.payload = payload as any;
  } catch (error) {
    console.error(error);
    throw new Error("not authentication");
  }
  return next();
};
