import Blog from "../models/BlogModel.js"

const getClientPage = async (req , res) => {
    try {
        const blogs = await Blog.find({})
        return res.render('home', {
            blogs
        })
    } catch (error) {
        console.log(error)
    }
}

export { getClientPage }