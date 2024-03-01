import { loadData, saveData } from "../model/index.js";
import { validationResult } from "express-validator";

export class fermentController{
    
    static async getFerment(req,res){
         const info = {
            data:{},
            summary:{}
         }
        try {
            //obtener la data
            const data = await loadData("ferment");
            info.data = data
            const cantRegistros = Object.keys(data)
            let cantDias = 0;
            let cantPesorPerdida =0;
            let cantPesoTotal = 0;
            cantRegistros.forEach(element => {
                //calcular promedio de dias
                let start = new Date(data[element].start_date)
                let end = new Date(data[element].end_date)

                const diferencia = end.getTime() - start.getTime();
                const unDiaEnMilisegundos = 1000 * 60 * 60 * 24; // Milisegundos en un día
                cantDias += (diferencia / unDiaEnMilisegundos);
                //calcular promedio de merma
                cantPesorPerdida += (data[element].input - data[element].output) 
                cantPesoTotal += data[element].input 
            });
            
            info.summary.avg_days = cantDias / cantRegistros.length
            info.summary.avg_weight_loss = (cantPesorPerdida * 100)/cantPesoTotal
            res.status(201).json({status:201, message:info})
        } catch (error) {
            res.status(400).json({status:400, message: "Error en la conusulta"})
        } 
    }

    static async postFerment(req,res){
        //validar si hubieron errores en el dto
        const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(400).send({status:400, message:errors.errors[0].msg})

            let {start_date, input, end_date, output} = req.body
            start_date = new Date(start_date)
            end_date = new Date(end_date)
            try {
            //Validar las fechas
            if(end_date < start_date) return res.status(400).json({status:400, message:"Error, la fecha de salida no puede ser menor a al fecha de entrada"})
            //Vlidar la cantidad
            if(output > input) return res.status(400).json({status:400, message:"Error, la cantidad se salida no puede ser mayor a la cantidad de entrada"})
            //agregar el registro
            const data = await loadData("ferment")
            const id = Date.now();
            data[id] = req.body;
            await saveData("ferment", data);
            res.status(201).json({status:201, message:"Record added"})
        } catch (error) {
            res.status(400).json({status:400, message: "Error en la conusulta"})
        }
    }

    static async deleteFerment(req,res){
            let {id_ferment} = req.params
            try {
            const data = await loadData("ferment")
            if(!data[id_ferment]) return res.status(400).json({status:400, message:"registro a eliminar inexistente"})
            delete data[id_ferment]
            await saveData("ferment", data);
            res.status(200).json({status:200, message:"Deleted record"})
        } catch (error) {
            res.status(400).json({status:400, message: "Error en la consulta"})
        }
    }

}