import express from "express";
import cors from "cors"

const server = express()

server.use(cors())

const receitas = [
  {
    id: 1,
    titulo: "Pão com Ovo",
    ingredientes: "Ovo e pão",
    preparo: "Frite o ovo e coloque no pão"
  },
  {
    id: 2,
    titulo: "Mingau de Whey",
    ingredientes: "Leite, Aveia e Whey",
    preparo: "Mistura tudo na panela fervendo",
  },
]

server.get("/receitas", (req, res) => {
  responda.send(receitas)
})

server.get("/receitas:id", (req, res) => {
  const { id } = req.params

  const receita = receitas.find(item => item.id === Number(id))

  if (receita) {
    return responda.send(receita)
  }
  res.send('Não existe essa receita')
})

server.listen(5001, () => {
  console.log('Servidor funfou de boas!!!')
})