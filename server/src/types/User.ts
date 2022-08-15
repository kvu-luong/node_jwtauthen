import { Field, ObjectType } from "type-graphql";

export type UserParam = {
  _id?: string;
  email?: string;
  password?: string;
  tokenVersion?: number;
};

export type validatePassword = {
  password: string;
  encryptedPass: string;
};

@ObjectType()
export class UserType {
  @Field()
  email!: string;
  @Field()
  password!: string;
  @Field()
  tokenVersion?: number;
}

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken!: string;
}
