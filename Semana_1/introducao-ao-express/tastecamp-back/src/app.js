import express from "express";
import cors from "cors"

const server = express()

server.use(cors())

server.get("/receitas", (req, responda) => {
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

  responda.send(receitas)
})

server.listen(5000, () => {
  console.log('Servidor funfou de boas!!!')
})