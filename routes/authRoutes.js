import express from "express"
import { getLogin, getSignUp, loginUser, logout, registerUser } from "../controller/authController.js"

const router = express.Router()

router.get('/' , getLogin)
router.get('/sign-up' , getSignUp)
router.post('/loginUser' , loginUser)
router.post('/registerUser', registerUser)
router.post('/logout', logout)

export default router