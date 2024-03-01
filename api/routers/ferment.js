import { Router } from "express";
import { validateAuthorization } from "../middleware/validateAuthorizaton.js";
import { validatePermisosFermentar } from "../middleware/validatePermisos.js";
import { validatePostFerment } from "../dto/fermentDTO.js";
import { fermentController } from "../controller/ferment.js";

const appFerment = Router();

appFerment.use(validateAuthorization)

appFerment.get("/", fermentController.getFerment)
appFerment.post("/:account", validatePermisosFermentar, validatePostFerment, fermentController.postFerment)
appFerment.delete("/:id_ferment", fermentController.deleteFerment)


export default appFerment;
