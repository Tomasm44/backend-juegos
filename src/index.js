import express from "express"
import cors from "cors"
import { pool } from "./db/config.js"
import authRoutes from "./routes/auth.routes.js"
import gamesRoutes from "./routes/games.routes.js"

const app = express()

app.use(cors({
  origin: "*", // Permite peticiones de cualquier origen (Netlify)
  allowedHeaders: ["Content-Type", "Authorization"] // Vital para que pase el token
}));
app.use(express.json()) 

app.use("/auth", authRoutes)
app.use("/games", gamesRoutes)

app.get("/", (req, res) => {
  res.send("API funcionando 🚀")
})

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()")
    res.json(result.rows)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

const PORT = process.env.PORT || 3000; // Toma el puerto de Render o usa 3000 localmente
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});