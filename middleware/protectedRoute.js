const isLogin = async (req, res, next) => {
    try {
        let authCookie = req.cookies.auth
        
        if(!authCookie){
            return res.redirect('/auth')
        }

        next()
    } catch (error) {
        console.log(error);
    }
}

export default isLogin