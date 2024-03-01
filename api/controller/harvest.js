import { loadData, saveData } from "../model/index.js";

export class harvestController{
    
    static async postCosecha(req,res){
        try {
           res.send("funcionando")
        } catch (error) {
            res.status(400).json({status:400, message: "Error en la conusulta"})
        }
    }
}