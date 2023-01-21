import { signIn, signUp } from "../controller/Auth.js"
import { Router } from 'express'
import { validateSchema } from "../middleware/validateSchema.js"
import { usuarioSchema, loginSchema } from '../schema/AuthSchema.js'

const authRouter = Router()

// Rotas de autenticação
authRouter.post("/sign-up", validateSchema(usuarioSchema), signUp)
authRouter.post("/sign-in", validateSchema(loginSchema), signIn)

export default authRouter