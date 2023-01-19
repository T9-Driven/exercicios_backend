import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)
let db;

try {
  await mongoClient.connect()
  db = mongoClient.db()
} catch (error) {
  console.log('Deu errro no server')
}


const server = express()

server.use(express.json())
server.use(cors())

server.get("/receitas", async (req, res) => {
  try {
    const dados = await db.collection("receitas").find().toArray()

    console.log(dados)

    return res.send(dados)
  } catch (error) {
    res.status(500).send("Deu zica no servidor de banco de dados")
  }

})

server.get("/receitas/:id", async (req, res) => {
  const { id } = req.params

  const receita = await db.collection("receitas").findOne({ _id: ObjectId(id) })

  if (!receita) {
    res.send('Não existe essa receita')
  }

  return res.send(receita)
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

server.delete("/receitas/:id", async (req, res) => {
  const { id } = req.params
  try {

    await db.collection("receitas").deleteOne({ _id: ObjectId(id) })

    res.status(202).send("Ok")

  } catch (error) {
    res.status(500).send("Deu algo errado no servidor")
  }
})

server.listen(5001, () => {
  console.log('Servidor funfou de boas!!!')
})