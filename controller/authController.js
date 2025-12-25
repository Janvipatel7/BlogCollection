import User from "../models/UserModel.js"

const getLogin = async (req , res) => {
    try {
       return res.render('login') 
    } catch (error) {
        console.log(error)
    }
}

const getSignUp  = async (req , res) => {
    try {
        return res.render('signUp')
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        let credentials = req.body
        const user = await User.findOne(credentials)

        if (!user) {
            return res.send('Invalid Email-ID or Password')
        }

        res.cookie('auth', user._id, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        return res.redirect('/admin')
    } catch (error) {
        console.log(error);
    }
}

const registerUser = async (req, res) => {
    try {
        const data = req.body

        const newUser = new User(data)
        await newUser.save()

        return res.redirect('/auth')
    } catch (error) {
        console.log(error);
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('auth')
        return res.redirect('/auth')
    } catch (error) {
        console.log(error);
    }
}


export { getLogin , getSignUp , loginUser , registerUser , logout}