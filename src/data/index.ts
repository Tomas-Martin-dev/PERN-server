import db from "../config/database";
import { exit } from "node:process"

const clearDB = async () => {
    try {
        await db.sync({force: true});
        console.log("Datos Eliminados correctamente");
        exit() 
    } catch (error) {
        console.log(error);
        exit(1)
    }
}

if (process.argv[2] === "--clear") {
    clearDB()
}