module.exports = {
  HOST: process.env.DB_HOST || "ep-muddy-moon-ax8w7ggr-pooler.c-4.us-east-2.aws.neon.tech",
  USER: process.env.DB_USER || "neondb_owner",
  PASSWORD: process.env.DB_PASSWORD || "npg_N6fivBjoT0wM",
  DB: process.env.DB_NAME || "neondb",
  PORT: process.env.DB_PORT || 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


