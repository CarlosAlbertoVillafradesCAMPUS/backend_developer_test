import { Router } from "express";
import { validateAuthorization } from "../middleware/validateAuthorizaton.js";
import { usersController } from "../controller/users.js";

const appUsers = Router();

appUsers.use(validateAuthorization)
appUsers.get("/account/", usersController.getUserAccount)

export default appUsers;
