import { MongoClient, Db } from "mongodb";
import { logger } from "../utils/logger";
import * as dotenv from "dotenv";
dotenv.config();

let client: Promise<MongoClient>;
let db: Promise<Db>;

let getClientConnect = async () => {
  return new Promise<MongoClient>(async (resolve, _reject) => {
    let dbUri: any = process.env["dbURI"];
    const clientInstance: MongoClient = new MongoClient(dbUri);
    const clientConnected = await clientInstance.connect();
    logger.info("return new client");
    return resolve(clientConnected);
  });
};

const getClient = async () => {
  if (client) {
    logger.info("return exit client");
    return client;
  }
  client = client ? client : getClientConnect();
  return client;
};

const getDbConnect = () => {
  return new Promise<Db>(async (resolve) => {
    let clientInstanace = await getClient();
    logger.info("return new db");
    return resolve(clientInstanace.db());
  });
};

export const getDb = async () => {
  if (db) {
    logger.info("return exist db");
    return db;
  }
  db = db ? db : getDbConnect();
  return db;
};
