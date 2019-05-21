const Articles = require('../../models/Articles'),
      Users = require('../../models/User'),
      path = require('path')

module.exports = (req, res) => {

    Users.findById(req.session.userId, (error, user) => {
        // console.log(req.flash('data')[0]);
        if (error) {
            console.log(error);
        }
        
        Articles.create(
            {
                ...req.body,
                author: user.userName,
                authorId: user._id
            },
            (error, post) => {
                if (error) {
                    console.log(error);
                    req.flash('error', 'Erreur lors de la création de l\'article');
                } else {
                    req.flash('success', 'Article créé avec succes !');
                }
                res.redirect(`/userProfile/${req.session.userId}`)
            })

    })
}