import jwt from "jsonwebtoken"

export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: "No autorizado" })
  }

  try {
    const data = jwt.verify(token, "secreto")
    req.user = data
    next()
  } catch (error) {
    res.status(401).json({ message: "Token inválido" })
  }
}