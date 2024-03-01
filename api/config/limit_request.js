import {rateLimit} from "express-rate-limit";

//controllar el imite de peticiones
export const limitRequest = () =>{
    return rateLimit({
        windowMs: 15 * 1000,
        max:20,
        standardHeaders:true,
        legacyHeaders: false,
        message: (req,res)=>{
            res.status(400).send({status:400, message: "Se alcanzo el limite de peticiones"})
        }
    })
}