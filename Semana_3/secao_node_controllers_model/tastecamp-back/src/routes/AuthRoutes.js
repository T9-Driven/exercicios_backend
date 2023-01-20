import { signIn, signUp } from "../controller/Auth.js"
import { Router } from 'express'

const authRouter = Router()

// Rotas de autenticação
authRouter.post("/sign-up", signUp)
authRouter.post("/sign-in", signIn)

export default authRouter