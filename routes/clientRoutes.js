import express from "express";
import { getClientPage } from "../controller/clientController.js";
import isLogin from "../middleware/protectedRoute.js";
const router = express.Router()

router.get('/', getClientPage)

export default router