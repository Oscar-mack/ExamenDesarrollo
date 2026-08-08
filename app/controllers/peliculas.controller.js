// Importamos los modelos desde la carpeta models
const db = require("../models");
const Pelicula = db.peliculas;
const Op = db.Sequelize.Op;

// Create and Save a new Pelicula
exports.create = (req, res) => {
  // Validamos que el nombre no venga vacío
  if (!req.body.nombre_pelicula) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Armamos el objeto pelicula con los datos del request
  const pelicula = {
    nombre_pelicula: req.body.nombre_pelicula,
    sinopsis: req.body.sinopsis,
    actores: req.body.actores,
    duracion_minutos: req.body.duracion_minutos,
    tipo: req.body.tipo,
    categoria: req.body.categoria,
    anio_lanzamiento: req.body.anio_lanzamiento
  };

  // Guardamos la nueva pelicula en la base de datos
  Pelicula.create(pelicula)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Pelicula."
      });
    });
};

// Retrieve all Clients from the database
exports.findAll = (req, res) => {
  const { nombre } = req.query;
  const condition = nombre
    ? { nombre_pelicula: { [Op.iLike]: `%${nombre}%` } }
    : null;

  Pelicula.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving peliculas."
      });
    });
};

// Find a single Client by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pelicula.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Pelicula with id=${id} was not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cliente with id=" + id
      });
    });
};

// Update a Client by id
exports.update = (req, res) => {
  const id = req.params.id;

  Pelicula.update(req.body, {
    where: { id: id }
  })
    .then(([num]) => {
      if (num === 1) {
        res.send({
          message: "Pelicula was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Pelicula with id=${id}. Maybe Pelicula was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Pelicula with id=" + id
      });
    });
};

// Delete a Client by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Pelicula.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pelicula was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Pelicula with id=${id}. La pelicula no fue encontrada!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pelicula with id=" + id
      });
    });
};

// Delete all Peliculas
exports.deleteAll = (req, res) => {
  Pelicula.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Peliculas were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all pelicula."
      });
    });
};


