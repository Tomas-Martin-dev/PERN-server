import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const databaseUrl = process.env.URL__DATABASE;

if (!databaseUrl) {
  throw new Error("URL de la base de datos no encontrada en las variables de entorno");
}

const db = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  models: [__dirname + "/../models/**/*"],
  schema: "public",
});

export default db;