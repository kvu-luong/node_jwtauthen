import { getDb } from "@helper/db";
import { hash, verify } from "argon2";
import _ from "lodash";
import { Collection } from "../../utils/constant";
import { UserParam, UserType, validatePassword } from "../../types";
import { Document, ObjectId } from "mongodb";

const UserModel = {
  findAll: async (): Promise<Document[]> => {
    let connectDb = await getDb();
    const project = {
      _id: 0,
      email: 1,
      password: 1,
      tokenVersion: 1,
    };

    let users = connectDb.collection(Collection.user).find().project(project).toArray();
    return users;
  },

  createUser: async (UserParams: UserType) => {
    let connectDb = await getDb();
    let userExist = await UserModel.getUserByEmail({ email: UserParams?.email });
    if (userExist) throw new Error("Email have already exited");
    const userEncryptParams = {
      ...UserParams,
      password: await hash(UserParams.password),
      tokenVersion: 0,
    };
    let user = await connectDb.collection(Collection.user).insertOne(userEncryptParams);
    return _.pick(user, ["email", "password"]);
  },

  updateTokenVersion: async ({ _id }: UserParam) => {
    let connectDb = await getDb();
    const filter = { _id: new ObjectId(_id) };
    const update = { $inc: { tokenVersion: 1 } };
    let result = await connectDb.collection(Collection.user).updateOne(filter, update);
    if (result.modifiedCount) return true;
    return false;
  },

  getUser: async () => {
    let connectDb = await getDb();
    let users = await connectDb.collection(Collection.user).find().toArray();
    return users;
  },

  getUserByEmail: async ({ email }: UserParam): Promise<UserParam | Document | null> => {
    const connectDb = await getDb();
    return await connectDb.collection(Collection.user).findOne({ email });
  },

  getUserById: async ({ _id }: UserParam): Promise<UserParam | Document | null> => {
    const connectDb = await getDb();
    return await connectDb.collection(Collection.user).findOne({ _id: new ObjectId(_id) });
  },

  isValidPassword: async ({ password, encryptedPass }: validatePassword): Promise<Boolean> => {
    if (!password || !encryptedPass) return false;
    return await verify(encryptedPass, password);
  },
};

export default UserModel;
