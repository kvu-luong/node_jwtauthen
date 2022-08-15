const user = require("express").Router();
import { ROUTE } from "../utils/constant";
import UserController from "../controllers/user.controller";

user.post(ROUTE.USER.REFRESH_TOKEN, UserController.refreshToken);

export default user;
