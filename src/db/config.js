import pkg from "pg"
const { Pool } = pkg

export const pool = new Pool({
  // Esta línea permite que Render use su variable de entorno y tú uses localhost en tu PC
  connectionString: process.env.DATABASE_URL, 
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
})