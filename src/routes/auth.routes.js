import express from "express"
import { pool } from "../db/config.js"
import bcrypt from "bcrypt"

const router = express.Router()

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const query = `
      INSERT INTO usuarios (nombre, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `

    const result = await pool.query(query, [
      nombre,
      email,
      hashedPassword
    ])

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).send(error.message)
  }
})

import jwt from "jsonwebtoken"

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const query = "SELECT * FROM usuarios WHERE email = $1"
    const result = await pool.query(query, [email])

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no existe" })
    }

    const user = result.rows[0]

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secreto",
      { expiresIn: "1h" }
    )

    res.json({ token })

  } catch (error) {
    res.status(500).send(error.message)
  }
})

export default router