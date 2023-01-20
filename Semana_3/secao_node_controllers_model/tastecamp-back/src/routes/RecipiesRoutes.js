import {
  listRecipies,
  getRecipieById,
  createRecipie,
  updateRecipie,
  deleteRecipie
} from "../controller/Recipies.js"
import { Router } from 'express'

const recipiesRouter = Router()

// Rotas das receitas
recipiesRouter.get("/receitas", listRecipies)
recipiesRouter.get("/receitas/:id", getRecipieById)
recipiesRouter.post("/receitas", createRecipie)
recipiesRouter.put("/receitas/:id", updateRecipie)
recipiesRouter.delete("/receitas/:id", deleteRecipie)

export default recipiesRouter
