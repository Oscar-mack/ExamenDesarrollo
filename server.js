const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

// Parsear requests de tipo application/json
app.use(bodyParser.json());

// Parsear requests de tipo application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

// // Si necesitas recrear las tablas desde cero (¡cuidado, borra los datos!):
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// Ruta simple de prueba
app.get("/", (req, res) => {
  res.type("html").send(`
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>UMG Web Application</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: #111827;
            color: #f9fafb;
          }
          .card {
            max-width: 520px;
            padding: 32px;
            border-radius: 16px;
            background: #1f2937;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
            text-align: center;
          }
          h1 {
            margin: 0 0 12px;
            font-size: 28px;
          }
          p {
            margin: 0;
            line-height: 1.6;
            color: #d1d5db;
          }
        </style>
      </head>
      <body>
        <main class="card">
          <h1>UMG Web Application</h1>
          <p>El servidor está funcionando correctamente. Usa <code>/api/peliculas</code> para consultar o crear películas.</p>
        </main>
      </body>
    </html>
  `);
});

require("./app/routes/peliculas.route")(app);
// Si agregas más recursos (ej. tutorial), regístralos igual:
// require("./app/routes/tutorial.route")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8081;

// --- MODIFICACIÓN AQUÍ ---
// Levantamos el servidor INMEDIATAMENTE para que el mensaje salga primero
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Y dejamos que la DB se sincronice en segundo plano
db.sequelize
  .sync()
  .then(() => {
    console.log("Base de datos sincronizada correctamente.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });








  