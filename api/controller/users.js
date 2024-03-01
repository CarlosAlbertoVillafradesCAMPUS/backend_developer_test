import { loadData } from "../model/index.js";

export class usersController{
    
    static async getUserAccount(req,res){
        try {
            const {id_user} = req.params
            const data = await loadData("users")
            //Validar si existe un usuario con ese id
            if (!data[id_user]) {
                return res.status(404).send({status:400, message:'Record not found'});
              }
            const dataUser = data[id_user] 
            //obtener la cantidad de Accounts de ese ussuario
            const cantAccounts = Object.keys(dataUser.accounts)
            const dataGet = {
                accounts: [],
                forms:[]
            }
            //obtener la informacion de accounts y forms
            const dataAccount = await loadData("accounts")
            const dataForms = await loadData("forms")
            //Agregar el nombre de los Accounts en el array de accounts y los objetos de forms
            cantAccounts.forEach(element => {
                //obtener nombre de Accounts y guardarlo en el array
                let nameAccount = dataUser.accounts[element].name
                dataGet.accounts.push(nameAccount)

                //obtener el rol y los forms de ese rol y ese Account
                let rol = dataUser.accounts[element].role
                let listForm = Object.keys(dataAccount[element].roles[rol].permissions) 
                let objectForms ={
                    nameAccount: nameAccount,
                    nameForm: []
                } 
                //recorrer la lista de forms de ese rol
                listForm.forEach((form)=>{
                    objectForms.nameForm.push(dataForms[form].name)
                })

                //guardar info en el object
                dataGet.forms.push(objectForms)
            });

            res.status(200).json({status:200, message: dataGet})
        } catch (error) {
            res.status(400).json({status:400, message: "Error en la conusulta"})
        }
    }
}