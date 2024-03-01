import { loadData } from "../model/index.js"

export const validateAuthorization = async(req,res,next) =>{
    try {
        const {authorization} = req.headers
        if (!authorization) return res.status(400).json({status:400, message:"Error no se a enviado ningun identificador de usuario"})
        const validateUser = await loadData("users")
        if (!validateUser[authorization]) return res.status(400).json({status:400, message:"Identificador de usuario inexistente"})
        req.data = authorization;
        next()
    } catch (error) {
        res.status(400).json({status:400, message:"Error al validar usuario"})
    }
}