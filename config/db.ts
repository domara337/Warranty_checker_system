import pg from "pg";
import env from "dotenv";

// Load environment variables from .env file
env.config();

// Create a Postgres connection pool for concurrent API requests
const db = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
});

// Test database connection without top-level await
db.connect()
  .then((client) => {
    console.log("Connected to the DB successfully");
    client.release(); // Release client back to pool
  })
  .catch((err) => {
    console.error("Error connecting to the DB", err);
    process.exit(1);
  });

export default db;