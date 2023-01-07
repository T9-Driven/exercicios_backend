import express from "express";
import cors from "cors"

const server = express()

server.use(express.json())
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

  const { limite } = req.query

  // [...receitas].reverse()
  // slice(-10, receitas.length)
  const receitasReverse = { ...receitas }

  const ultimasReceitas = receitasReverse.reverse().slice(0, parseInt(limite))

  res.send(ultimasReceitas)
})

server.get("/receitas/:id", (req, res) => {
  const { id } = req.params

  const receita = receitas.find(item => item.id === Number(id))

  if (receita) {
    return res.send(receita)
  }
  res.status(404).send("A receita não foi encontrada")
})

server.post("/receitas", (req, res) => {
  const novaReceita = req.body

  const { nivel } = req.headers

  if (nivel != "admin") {
    return res.status(401).send('Voce não tem permissao de cadastrar receitas somente o admin')
  }

  if (!novaReceita.titulo || !novaReceita.ingredientes || !novaReceita.preparo) {
    return res.status(422).send("Por favor mande todos os campos preenchidos!")
  }

  const id = receitas.length + 1;
  novaReceita.id = id;

  receitas.push(novaReceita)

  res.sendStatus(201)
})

server.listen(5001, () => {
  console.log('Servidor funfou de boas!!!')
})



// 200: Ok => Significa que deu tudo certo com a requisição
// 201: Created => Sucesso na criação do recurso
// 301: Moved Permanently => Significa que o recurso que você está tentando acessar foi movido pra outra URL
// 401: Unauthorized => Significa que você não tem acesso a esse recurso
// 404: Not Found => Significa que o recurso pedido não existe
// 409: Conflict => Significa que o recurso que você está tentando inserir já foi inserido
// 422: Unprocessable Entity => Significa que a requisição enviada não está no formato esperado
// 500: Internal Server Error => Significa que ocorreu algum erro desconhecido no servidor