const developmentEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/entities/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations"
  },
  ssl: false,
}

const productionEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrations: ["./build/database/migrations/*.js"],
  entities: ["./build/entities/*.js"],
  cli: {
    migrationsDir: "./src/database/migrations"
  },
  ssl: process.env.NODE_ENV === "production" ? {
    rejectUnauthorized: false
  } : false
}

module.exports = process.env.NODE_ENV === "production" ? productionEnv : developmentEnv
