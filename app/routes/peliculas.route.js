module.exports = app => {
  const pelicula = require("../controllers/peliculas.controller.js");
  var router = require("express").Router();

  // Create a new Pelicula
  router.post("/create/", pelicula.create);
  router.post("/", pelicula.create);
  // Retrieve all Peliculas
  router.get("/", pelicula.findAll);
  // Retrieve a single Pelicula by id
  router.get("/:id", pelicula.findOne);
  // Update a Pelicula by id
  router.put("/:id", pelicula.update);
  router.put("/update/:id", pelicula.update);
  // Delete a Pelicula by id
  router.delete("/:id", pelicula.delete);
  router.delete("/delete/:id", pelicula.delete);
  // Delete all Peliculas
  router.delete("/delete/", pelicula.deleteAll);

  // app.use("/prefijo", router) simplifica el URI final
  // Ej. http://localhost:puerto/api/pelicula/
  app.use("/api/pelicula", router);
  app.use("/api/peliculas", router);
};



