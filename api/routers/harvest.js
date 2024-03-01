import { Router } from "express";
import { validateAuthorization } from "../middleware/validateAuthorizaton.js";
import { validatePermisosCosechar } from "../middleware/validatePermisos.js";
import { validatePostCosecha } from "../dto/harvestDTO.js";
import { harvestController } from "../controller/harvest.js";

const appHarvest = Router();

appHarvest.use(validateAuthorization)

appHarvest.post("/:account", validatePermisosCosechar, validatePostCosecha, harvestController.postCosecha)

export default appHarvest;
