import express from "express"
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
import router from "./router"
import db from "./config/database"
import swaggerUI from "swagger-ui-express"
import swaggerSpec, { swaggerUIOptions } from "./config/swagger"
import { logger } from "sequelize/lib/utils/logger"
import { initCronJob } from "./handlers/cron-job"

// instancia de express
const server = express()

//Permitir Cors 
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.URL_FRONTEND) {
            callback(null, true);
            return;
        }
        callback(new Error('Dominio no permitido'));
        console.log('NO permitido por CORS', origin || 'IP desconocida');
    }
};
server.use(cors(corsOptions))

// leer datos
server.use(express.json())

// conectamos la database
async function connectDB() {
    try {
        await db.authenticate();
        await db.sync({ force: false, schema: "public" })
        console.log("conexion a db correcta");
    } catch (error) {
        console.log("error al conectar al DB", error);
    }
}
connectDB()

// cronJob
initCronJob();

server.use(morgan("dev"))

// Routing
server.use("/api/products", router)

// Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))


export default server