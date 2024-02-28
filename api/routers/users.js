import { Router } from "express";
import { usersController } from "../controller/users.js";

const appUsers = Router();

appUsers.get("/", usersController.getAll)

export default appUsers;
