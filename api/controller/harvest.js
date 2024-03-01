import { loadData, saveData } from "../model/index.js";
import { validationResult } from "express-validator";

export class harvestController{
    
    static async postCosecha(req,res){
        //validar si hubieron errores en el dto
        const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(400).send({status:400, message:errors.errors[0].msg})

        try {
            const id = Date.now();
            const data = await loadData("harvest");
            data[id] = req.body;
            await saveData("harvest", data);
            res.status(201).json({status:201, message:"Record added"})
        } catch (error) {
            res.status(400).json({status:400, message: "Error en la conusulta"})
        }
    }
}