import request from "supertest"
import server from "../../server"
import { response } from "express";


describe("POST /api/prodcuts", ()=> {
    it("should display validation errors", async ()=> {
        const response = await request(server).post("/api/products").send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(4);
        
        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    })
    
    it("should create a new prodcut", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Mouse Testing",
            price: 50
        })
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");
        
        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("errors");
    })
    
    it("sohuld validate that the price is a number and greater than 0", async ()=>{
        const response = await request(server).post("/api/products").send({
            name: "Monitor Testing",
            price: 0
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
        
        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    })
})

describe("GET /api/products", ()=>{
    it("should check if api/products url exists", async () => {
        const response = await request(server).get("/api/products");
        expect(response.status).not.toBe(404)
    })
    
    it("GET a JSON response with products", async () => {
        const response = await request(server).get("/api/products");
        expect(response.status).toBe(200)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toHaveLength(1)
        
        expect(response.body).not.toHaveProperty("errors")
    })
})

describe("GET /api/products/id", ()=>{
    it("should return a 404 response for a non-existent produts", async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`);
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.errors).toBe("Producto no Existente");
    })
    it("should check a valid id in the url", async () => {
        const response = await request(server).get(`/api/products/not-valid-url`);
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.data).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("El parametro tiene que ser un entero");
    })
    it("get a JSON response for a single product", async () => {
        const response = await request(server).get(`/api/products/1`);
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
    })
})

describe("PUT /api/products/id", ()=>{
    it("should display validation error message when updating a product", async () => {
        const response = await request(server).put(`/api/products/1`).send({});
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toBe("Producto no Existente");
        expect(response.body.errors).toHaveLength(5)
        
        expect(response.status).not.toBe(200)
    })

    it("should validate that the price is greater than 0", async () => {
        const response = await request(server).put(`/api/products/1`).send({
            name:"monitor testing",
            availability: true,
            proce: -200
        });
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.data).toHaveLength(1)
    })
    
    it("should check if api/products url exists", async () => {
        const response = await request(server).put("/api/products/not-validt-url").send({
            name:"monitor testing",
            availability: true,
            proce: 200
        });
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")
        expect(response.body.data).toHaveLength(1)
    })

    it("should return a 404 response for a non-existent product", async () => {
        const idnotvalid = 30000;
        const response = await request(server).put(`/api/products/${idnotvalid}`).send({
            name:"monitor testing",
            availability: true,
            proce: 200
        });
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.errors).toBe("Producto no Existente");
    })
    
    it("should update an existing product with valid data", async () => {
        const response = await request(server).put(`/api/products/1`).send({
            name:"monitor testing",
            availability: true,
            proce: 200
        });
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty("errors")
    })
})

describe("DELETE /api/products/id", ()=>{
    it("should check a valid ID", async () => {
        const response = await request(server).delete("/api/products/not-valid");
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")
    })
    
    it("dhould retuirn a 404 resposne for a non-existent product", async () => {
        const idnot = 3000;
        const response = await request(server).delete(`/api/products/${idnot}`);
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toHaveLength(1)
        
        expect(response.body).not.toHaveProperty("errors")
    })
    
    it("should delete a product", async () => {
        const response = await request(server).delete("/api/products/1");
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toHaveLength(1)
        
        expect(response.status).not.toBe(404)
    })
})