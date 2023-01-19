import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'
import joi from 'joi'

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
  const receita = req.body

  const receitaSchema = joi.object({
    titulo: joi.string().required(),
    preparo: joi.string().required(),
    ingredientes: joi.string().required(),
  })

  const validation = receitaSchema.validate(receita, { pick: ['titulo', 'preparo', 'ingredients'], abortEarly: false })

  if (validation.error) {
    const erros = validation.error.details.map((err) => {
      return err.message
    })
    return res.status(422).send(erros)
  }


  try {

    const receitaExiste = await db.collection("receitas").findOne({ titulo: receita.titulo })

    if (receitaExiste) return res.status(409).send("Essa receita já está cadastrada!")

    const data = await db.collection("receitas").insertOne({ titulo: receita.titulo, preparo: receita.titulo, ingredientes: receita.ingredientes })
    console.log(data)
    res.send("ok")

  } catch (err) {
    console.log(err)
    res.status(500).send("Deu algo errado no servidor")
  }
})

server.put("/receitas/:id", async (req, res) => {
  const { id } = req.params
  const receita = req.body

  try {

    const { modifiedCount } = await db.collection("receitas").updateOne({ _id: ObjectId(id) },
      { $set: receita, $inc: { views: 1 } });


    if (modifiedCount === 0) return res.status(404).send("Essa receita não existe!");

    res.send("A sua receita foi atualizada com sucesso!")

  } catch (error) {
    console.log(error)
    res.status(500).send("Houve um problema com o banco de dados!")
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