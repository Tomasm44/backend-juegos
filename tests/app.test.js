import test from "node:test"
import assert from "node:assert"
import request from "supertest"
import express from "express"
import authRoutes from "../src/routes/auth.routes.js"

const app = express()
app.use(express.json())
app.use("/auth", authRoutes)

// TEST REGISTER
test("debería registrar un usuario", async () => {
  const res = await request(app).post("/auth/register").send({
    nombre: "Test",
    email: "test3@test.com",
    password: "123456"
  })

  assert.strictEqual(res.statusCode, 201)
})

// TEST LOGIN
test("debería hacer login", async () => {
  const res = await request(app).post("/auth/login").send({
    email: "test@test.com",
    password: "123456"
  })

  assert.strictEqual(res.statusCode, 200)
  assert.ok(res.body.token)
})