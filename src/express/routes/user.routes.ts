import express, { Router } from "express"
import { welcomeController } from "../controllers/user.controller"
import auth from "../middleware/auth"
const router = Router()

// welcome route
router.get('/', auth, welcomeController)



export default router