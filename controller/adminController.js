import Blog from "../models/BlogModel.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"

const fileName = fileURLToPath(import.meta.url)
const directoryName = path.dirname(fileName)

const getAdminPage = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        return res.render('index', {
            blogs
        })
    } catch (error) {
        console.log(error);
    }
}

const getBlogForm = (req, res) => {
    try {
        return res.render('addBlog')
    } catch (error) {
        console.log(error)
    }
}

const addBlog = async (req, res) => {
    try {

        if (!req.body.name || !req.body.desc || !req.body.tags || !req.file) {
            return res.send("All fields are required");
        }

        const data = req.body
        const doc = req.file.path
        const blog = {
            ...data, file: doc
        }

        const newBlog = new Blog(blog)
        await newBlog.save()
        return res.redirect('/admin')
    } catch (error) {
        console.log(error)
    }
}

const editBlog = async (req, res) => {
    try {
        const { id } = req.params
        const editBlog = await Blog.findById(id)
        return res.render('editBlog', {
            editBlog
        })
    } catch (error) {
        console.log(error)
    }
}

const editedBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id)
        const editedData = req.body

        if (!editedData.name || !editedData.desc || !editedData.tags) {
            return res.send("All fields are required")
        }

        if (req.file) {
            const oldImagePath = path.join(directoryName, "..", blog.file)
            fs.unlink(oldImagePath, (err) => {
                console.log(err);
            })

            const newImagePath = req.file.path
            editedData.file = newImagePath
        }

        await Blog.findByIdAndUpdate(id, editedData)
        return res.redirect('/admin')
    } catch (error) {
        console.log(error)
    }
}

const deleteBlog = async (req , res) => {
    try {
       const { id } = req.params
       const blog = await Blog.findById(id)
       const imgpath = path.join(directoryName, ".." , blog.file) 

       fs.unlink(imgpath , (error) => {
        console.log(error)
       })

       await Blog.findByIdAndDelete(id)
       return res.redirect('/admin')
    } catch (error) {
        console.log(error)
    }
}

export { getAdminPage, getBlogForm, addBlog, editBlog, editedBlog , deleteBlog}