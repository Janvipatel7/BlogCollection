import express from "express";
import { addBlog, deleteBlog, editBlog, editedBlog, getAdminPage, getBlogForm } from "../controller/adminController.js";
import upload from "../middleware/multer.js";
import isLogin from "../middleware/protectedRoute.js";
const router  = express.Router()

router.get('/' , isLogin ,  getAdminPage)
router.get('/add-blog', isLogin , getBlogForm)
router.post('/add-blog' , upload.single('file'), addBlog)
router.get('/edit-blog/:id', editBlog)
router.post('/edit-blog/:id' , upload.single('file') , editedBlog)
router.get('/delete-blog/:id' , deleteBlog)

export default router