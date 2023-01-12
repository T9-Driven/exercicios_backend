import express from "express"
import cors from "cors"
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)
let db;

try {
  await mongoClient.connect()
  db = mongoClient.db("tastecamp")
} catch (error) {
  console.log('Deu errro no server')
}


const server = express()

server.use(express.json())
server.use(cors())

server.get("/receitas", (req, res) => {
  db.collection("receitas").find().toArray().then(dados => {
    return res.send(dados)
  }).catch(() => {
    res.status(500).send("Deu zica no servidor de banco de dados")
  })
})

server.get("/receitas/:id", (req, res) => {
  const { id } = req.params

  const receita = receitas.find(item => item.id === Number(id))

  if (receita) {
    return res.send(receita)
  }
  res.send('Não existe essa receita')
})

server.post("/receitas", async (req, res) => {
  const { titulo, preparo, ingredientes } = req.body


  try {

    const receitaExiste = await db.collection("receitas").findOne({ titulo })

    if (receitaExiste) return res.status(409).send("Essa receita já está cadastrada!")

    await db.collection("receitas").insertOne({ titulo, preparo, ingredientes })

    res.send("ok")

  } catch (err) {
    console.log(err)
    res.status(500).send("Deu algo errado no servidor")
  }
})

server.listen(5001, () => {
  console.log('Servidor funfou de boas!!!')
})