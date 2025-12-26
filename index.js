import './config/env.js'
import express from "express"
import connectDb from "./config/db.js"
import cookieParser from 'cookie-parser'
import adminRouter from './routes/adminRoutes.js'
import authRouter from './routes/authRoutes.js'
import clientRouter from './routes/clientRoutes.js'

const PORT = process.env.PORT || 7000

const app = express()
connectDb()


app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))

app.use('/auth' , authRouter)
app.use('/admin', adminRouter)
app.use('/' , clientRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
