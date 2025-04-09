import { Request, Response } from "express"
import Product from "../models/Product.model";


export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body)
    res.status(201).json({data: product})
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const productos = await Product.findAll({
            attributes: {exclude: ["createdAt", "updatedAt"]},
            order: [
                ["id", "DESC"]
            ]
        });
        res.json({data: productos})
    } catch (error) {
        console.log(error);
    }
}

export const getProductsByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const producto = await Product.findByPk(id, {
            attributes: {exclude: ["createdAt", "updatedAt"]}
        }) 

        if (!producto) {
            return res.status(404).json({
                error: "Producto no Existente"
            })
        }

        res.json({data: producto})
    } catch (error) {
        console.log(error);
    }
}

export const putEditProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const producto = await Product.findByPk(id, {
            attributes: {exclude: ["createdAt", "updatedAt"]}
        }) 

        if (!producto) {
            return res.status(404).json({
                error: "Producto no Existente"
            })
        }

        // actualizo
        await producto.update(req.body)
        await producto.save()
        res.json({data: producto})
    } catch (error) {
        console.log(error);
    }
}

export const patchAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const producto = await Product.findByPk(id) 

        if (!producto) {
            return res.status(404).json({
                error: "Producto no Existente"
            })
        }

        // actualizar availability
        producto.availability = !producto.dataValues.availability;
        await producto.save()
        res.json({data: producto})
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const producto = await Product.findByPk(id, {
            attributes: {exclude: ["createdAt", "updatedAt"]}
        }) 

        if (!producto) {
            return res.status(404).json({
                error: "Producto no Existente"
            })
        }

        // elimino
        producto.destroy()
        res.json({data: "Producto Eliminado"})
    } catch (error) {
        console.log(error);
    }
}