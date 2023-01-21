import db from '../config/database.js'

export async function authValidation(req, res, next) {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", '')

  if (!token) return res.status(422).send("Informe o token!")

  try {
    const checkSession = await db.collection("sessoes").findOne({ token })

    if (!checkSession) return res.status(401).send("Você não tem autorização para cadastrar uma receita")

    res.locals.sessao = checkSession

    next()

  } catch (error) {
    res.status(500).send(error)
  }
}