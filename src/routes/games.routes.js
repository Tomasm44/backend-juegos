import express from "express"
import { pool } from "../db/config.js"
import { verificarToken } from "../middlewares/auth.middleware.js"

const router = express.Router()

// Obtener juegos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM juegos")
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los juegos" })
  }
})

router.post("/", verificarToken, async (req, res) => {
  const { titulo, descripcion, precio, imagen } = req.body

  const query = `
    INSERT INTO juegos (titulo, descripcion, precio, imagen, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `

  const result = await pool.query(query, [
    titulo,
    descripcion,
    precio,
    imagen,
    req.user.id
  ])

  res.status(201).json(result.rows[0])
})

export default router