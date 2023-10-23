const { Photo, User } = require("../models")



class PhotoController {
    static getAllPhotos(req, res) {
        Photo.findAll({
            include: User
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getOnePhotoByID(req, res) {
        const photoId = +req.params.id;

        Photo.findByPk(photoId)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static createPhoto(req, res) {
        const { title, caption, image_url } = req.body;
        const user = res.locals.user
        Photo.create({
            title,
            caption,
            image_url,
            UserId: user.id 
        })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static updateOnePhotoByID(req, res) {
        const photoId = +req.params.id;
        const { title, caption, image_url } = req.body;

        Photo.update({title, caption, image_url}, {
            where: {
                id: photoId
            },
            returning: true
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }


    static deleteOnePhotoByID(req, res) {
        const photoId = +req.params.id;
        
        Photo.destroy({
            where: {
                id: photoId
            }
        })
            .then(result => {
                res.status(200).json(result)
            })
            .then(err => {
                res.status(500).json(err)
            })
    }
}


module.exports = PhotoController;