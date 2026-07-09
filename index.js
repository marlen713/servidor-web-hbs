import express from "express";
import { engine } from "express-handlebars";
import webRoutes from "./routes/web.routes.js";

// Creamos la aplicacion de Express
const app = express();

// Configuramos el entorno
const PORT = 3001;


// Middlewares
app.use(express.json());


// Servir contenido estatico
// Todo lo que este dentro de este directorio public podra ser usado por el navegador
app.use(express.static("public"));


// Configuracion de Handlebars
// Aqui le decimos a Express que motor de plantilla usaremos
app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        layoutsDir: "views/layouts",
        partialsDir: "views/partials",
        helpers: {
            mayuscula: (texto) => texto.toUpperCase(),
            esImportante: (valor) => {
                return valor ? "Sí" : "No";
            },
        },
    })
);

// Definimos la carpeta donde estan las vistas
app.set("views", "views");

// Definir Handlebars como motor de plantilla
app.set("view engine", "handlebars")


app.use("/", webRoutes);


// Middlewares para rutas no encontradas
app.use((req, res) => {
    res.status(404).send("<h1>404 - Página no encontrada</h1>")
});


// Levantar el servidor 
// app.listen inicia el servidor y lo deja escuchando peticiones.
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});