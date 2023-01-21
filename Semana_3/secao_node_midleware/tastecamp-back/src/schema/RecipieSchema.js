import joi from 'joi'

export const receitaSchema = joi.object({
  titulo: joi.string().required(),
  preparo: joi.string().required(),
  ingredientes: joi.string().required(),
})

export const atualizarReceitaSchema = joi.object({
  titulo: joi.string(),
  preparo: joi.string(),
  ingredientes: joi.string(),
})