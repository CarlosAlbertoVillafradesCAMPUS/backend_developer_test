import { Router } from "express";
import { usersController } from "../controller/users.js";

const appUsers = Router();

appUsers.get("/account/:id_user", usersController.getUserAccount)

export default appUsers;
