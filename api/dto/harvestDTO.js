import { check, body } from "express-validator";

export const validatePostCosecha = [
    body()
    .custom((value, { req }) => {
        const permitidas = ["date", "employee", "quantity",]; // Lista de propiedades permitidas
  
        // Verificar si hay propiedades no permitidas en el cuerpo
        const propiedadesNoPermitidas = Object.keys(req.body).filter(prop => !permitidas.includes(prop));
  
        if (propiedadesNoPermitidas.length > 0) {
          throw new Error(`Propiedades no permitidas: ${propiedadesNoPermitidas.join(', ')}`);
        }
  
        return true; // Indica que la validación fue exitosa
      })
      .withMessage('El Body contiene propiedades no permitidas'),

      check("date")
      .notEmpty().withMessage("La propiedad 'date' es obligatoria")
      .isString().withMessage("La propiedad 'date' debe ser un tipo Date"),

      check("employee")
      .notEmpty().withMessage("La propiedad 'employee' es obligatoria")
      .isString().withMessage("La propiedad 'employee' debe ser un string"),

      check("quantity")
      .notEmpty().withMessage("La propiedad 'quantity' es obligatoria")
      .isInt().withMessage("La propiedad 'quantity' debe ser un tipo INT")
]