import joi from 'joi'

export const receitaSchema = joi.object({
  titulo: joi.string().required(),
  preparo: joi.string().required(),
  ingredientes: joi.string().required(),
})