import express from "express"
import cors from "cors"
import authRouter from "./routes/AuthRoutes.js"
import recipiesRouter from "./routes/RecipiesRoutes.js"

const server = express()

server.use(express.json())

server.use(cors())

server.use([authRouter, recipiesRouter])

server.listen(5001, () => {
  console.log('Servidor funfou de boas!!!')
})