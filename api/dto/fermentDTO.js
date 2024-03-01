import { check, body } from "express-validator";

export const validatePostFerment = [
    body()
    .custom((value, { req }) => {
        const permitidas = ["start_date", "input", "end_date", "output"]; // Lista de propiedades permitidas
  
        // Verificar si hay propiedades no permitidas en el cuerpo
        const propiedadesNoPermitidas = Object.keys(req.body).filter(prop => !permitidas.includes(prop));
  
        if (propiedadesNoPermitidas.length > 0) {
          throw new Error(`Propiedades no permitidas: ${propiedadesNoPermitidas.join(', ')}`);
        }
  
        return true; // Indica que la validación fue exitosa
      })
      .withMessage('El Body contiene propiedades no permitidas'),

      check("start_date")
      .notEmpty().withMessage("La propiedad 'start_date' es obligatoria")
      .isString().withMessage("La propiedad 'start_date' debe ser un tipo Date"),

      check("input")
      .notEmpty().withMessage("La propiedad 'input' es obligatoria")
      .isInt().withMessage("La propiedad 'input' debe ser un tipo INT"),


      check("end_date")
      .notEmpty().withMessage("La propiedad 'end_date' es obligatoria")
      .isString().withMessage("La propiedad 'end_date' debe ser un tipo Date"),

      check("output")
      .notEmpty().withMessage("La propiedad 'output' es obligatoria")
      .isInt().withMessage("La propiedad 'output' debe ser un tipo INT")
]

export const validatePutFerment = [
    body()
    .custom((value, { req }) => {
        const permitidas = ["start_date", "input", "end_date", "output"]; // Lista de propiedades permitidas
  
        // Verificar si hay propiedades no permitidas en el cuerpo
        const propiedadesNoPermitidas = Object.keys(req.body).filter(prop => !permitidas.includes(prop));
  
        if (propiedadesNoPermitidas.length > 0) {
          throw new Error(`Propiedades no permitidas: ${propiedadesNoPermitidas.join(', ')}`);
        }
  
        return true; // Indica que la validación fue exitosa
      })
      .withMessage('El Body contiene propiedades no permitidas'),

      check("start_date")
      .optional()
      .isString().withMessage("La propiedad 'start_date' debe ser un tipo Date"),

      check("input")
      .optional()
      .isInt().withMessage("La propiedad 'input' debe ser un tipo INT"),


      check("end_date")
      .optional()
      .isString().withMessage("La propiedad 'end_date' debe ser un tipo Date"),

      check("output")
      .optional()
      .isInt().withMessage("La propiedad 'output' debe ser un tipo INT")
]