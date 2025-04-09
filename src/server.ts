import express from "express"
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
import router from "./router"
import db from "./config/database"
import swaggerUI from "swagger-ui-express"
import swaggerSpec, { swaggerUIOptions } from "./config/swagger"
import { logger } from "sequelize/lib/utils/logger"

// instancia de express
const server = express()

// Lista de IPs permitidas de Cron-Job.org (actualizada al 9 de abril de 2025)
const allowedCronJobIPs = [
    '116.203.129.16',
    '116.203.134.67',
    '23.88.105.37',
    '128.140.8.200'
];

//Permitir Cors 
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.URL_FRONTEND) {
            callback(null, true);
            return;
        }
        if (!origin) {
            const clientIP = this.req.socket.remoteAddress;
            if (allowedCronJobIPs.includes(clientIP)) {
                callback(null, true);
                return;
            }
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

server.use(morgan("dev"))

// Routing
server.use("/api/products", router)

// Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))


export default server