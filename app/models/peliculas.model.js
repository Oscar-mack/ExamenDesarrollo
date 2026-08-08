// Utilizamos module.exports para exportar el modelo para que pueda ser usado en otras clases
module.exports = (sequelize, Sequelize) => {
  // sequelize.define() define el nombre de la entidad en la BD, en este caso "cliente"
  // Sequelize.<TIPO> define el tipo de dato de cada atributo
  const Pelicula = sequelize.define("pelicula", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_pelicula: {
      type: Sequelize.STRING
    },
    sinopsis: {
      type: Sequelize.STRING
    },
    actores: {
      type: Sequelize.STRING
    },
    duracion_minutos: {
      type: Sequelize.INTEGER
    },
    tipo: {
      type: Sequelize.STRING
    },
    categoria: {
      type: Sequelize.STRING
    },
    anio_lanzamiento: {
      type: Sequelize.INTEGER
    },

  });
  return Pelicula;
};

//nombre de la pelicula, sinopsis actores duracion en minutos tipo serie o pelicula categoria año de lanzamiento 