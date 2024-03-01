import { Router } from "express";
import { validateAuthorization } from "../middleware/validateAuthorizaton.js";
import { validatePermisos } from "../middleware/validatePermisos.js";
import { harvestController } from "../controller/harvest.js";

const appHarvest = Router();

appHarvest.use(validateAuthorization)

appHarvest.post("/:account", validatePermisos, harvestController.postCosecha)

export default appHarvest;
