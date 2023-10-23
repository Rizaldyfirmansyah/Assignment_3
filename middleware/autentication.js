const { User } = require("../models");
const { verfyToken } = require("../helpers/jwt")



function authentication(req, res, next) {
    try {
        const token = req.get("token")
        const userDecode = verfyToken(token)

        User.findOne({
            where: {
                id: userDecode.id,
                email: userDecode.email
            }
        })
            .then(user => {
                if(!user) {
                    return res.status(401).json({
                        name: "Authentication Error",
                        devMessage: `User with id "${userDecode.id}" not found in database`
                    })
                }

                res.locals.user = user;
                return next()
            })
            .catch(err => {
                return res.status(401).json(err)
            })
    } catch (error) {
        return res.status(401).json(error)
    }
}



module.exports = authentication;