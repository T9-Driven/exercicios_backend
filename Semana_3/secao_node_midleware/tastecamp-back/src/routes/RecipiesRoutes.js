import {
  listRecipies,
  getRecipieById,
  createRecipie,
  updateRecipie,
  deleteRecipie
} from "../controller/Recipies.js"
import { Router } from 'express'
import { validateSchema } from "../middleware/validateSchema.js"
import { receitaSchema } from '../schema/RecipieSchema.js'
import { authValidation } from "../middleware/AuthMiddleware.js"

const recipiesRouter = Router()

// Rotas das receitas
recipiesRouter.use(authValidation)
recipiesRouter.get("/receitas", listRecipies)
recipiesRouter.get("/receitas/:id", getRecipieById)
recipiesRouter.put("/receitas/:id", updateRecipie)
recipiesRouter.post("/receitas", validateSchema(receitaSchema), createRecipie)
recipiesRouter.delete("/receitas/:id", deleteRecipie)

export default recipiesRouter
