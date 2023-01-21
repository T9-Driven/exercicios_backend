import { receitaSchema } from '../schema/RecipieSchema.js'
import db from '../config/database.js'

export async function listRecipies(req, res) {
  try {
    const dados = await db.collection("receitas").find().toArray()

    console.log(dados)

    return res.send(dados)
  } catch (error) {
    res.status(500).send("Deu zica no servidor de banco de dados")
  }
}

export async function getRecipieById(req, res) {
  const { id } = req.params

  const receita = await db.collection("receitas").findOne({ _id: ObjectId(id) })

  if (!receita) {
    res.send('Não existe essa receita')
  }

  return res.send(receita)
}

export async function createRecipie(req, res) {
  const receita = req.body
  const checkSession = res.locals.sessao

  try {
    const receitaExiste = await db.collection("receitas").findOne({ titulo: receita.titulo })

    if (receitaExiste) return res.status(409).send("Essa receita já está cadastrada!")

    const data = await db.collection("receitas").insertOne(
      { titulo: receita.titulo, preparo: receita.titulo, ingredientes: receita.ingredientes, idUsuario: checkSession.idUsuario })
    console.log(data)
    res.send("ok")

  } catch (err) {
    console.log(err)
    res.status(500).send("Deu algo errado no servidor")
  }
}

export async function updateRecipie(req, res) {
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
}

export async function deleteRecipie(req, res) {
  const { id } = req.params

  try {

    await db.collection("receitas").deleteOne({ _id: ObjectId(id) })

    res.status(202).send("Ok")

  } catch (error) {
    res.status(500).send("Deu algo errado no servidor")
  }
}