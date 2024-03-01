import { loadData } from "../model/index.js";

export const validatePermisosCosechar = async(req,res,next) => {
    try {
        const id_user = req.data;
        const dataUsers = await loadData("users")
        const user = dataUsers[id_user]
        const validateAccount = user.accounts[req.params.account]
        if(!validateAccount) return res.status(400).json({status:400, message:`Error, el ususario: ${id_user} no cuenta con el Account: ${req.params.account}`})

        const rol = validateAccount.role
        const dataAccount = await loadData("accounts");
        const validatePermission = dataAccount[req.params.account].roles[rol].permissions["form1"].create
        if (!validatePermission) return res.status(400).json({status:400, message:`La cuenta '${req.params.account}' no tiene permisos para 'Cosechar'`})

        next()
    } catch (error) {
        res.status(400).json({status:400, message:`Error al validar Permisos`, data:error.message})
    }
};

export const validatePermisosFermentar = async(req,res,next) => {
    try {
        const id_user = req.data;
        const dataUsers = await loadData("users")
        const user = dataUsers[id_user]
        const validateAccount = user.accounts[req.params.account]
        if(!validateAccount) return res.status(400).json({status:400, message:`Error, el ususario: ${id_user} no cuenta con el Account: ${req.params.account}`})

        const rol = validateAccount.role
        const dataAccount = await loadData("accounts");
        const validatePermission = dataAccount[req.params.account].roles[rol].permissions["form1"].create
        if (!validatePermission) return res.status(400).json({status:400, message:`La cuenta '${req.params.account}' no tiene permisos para 'Cosechar'`})

        next()
    } catch (error) {
        res.status(400).json({status:400, message:`Error al validar Permisos`, data:error.message})
    }
}