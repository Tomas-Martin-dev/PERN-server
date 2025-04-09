import { check, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express"

export const validateProduct = [
    check("name").notEmpty().withMessage("El nombre del producto está vacío"),
    check("price").notEmpty().withMessage("El precio del producto esta vacio")
    .isNumeric().withMessage("El valor solo puede ser numerico")
    .custom( value => value > 0 ).withMessage("El valor tiene que ser mayor a 0")
];

export const HasErrors = (req: Request , res: Response) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
}

export const validarProductID = [
    param("id").isInt().withMessage("El parametro tiene que ser un entero")
    .custom( value => value > 0 ).withMessage("El valor tiene que ser mayor a 0")
];