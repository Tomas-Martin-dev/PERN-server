import server from "./server";

const puerto = 4401;
server.listen(puerto, ()=>{
    console.log(`REST API en el puerto ${puerto}`);
})