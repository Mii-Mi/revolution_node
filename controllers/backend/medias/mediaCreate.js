const Media = require('../../../models/Medias'),
      path = require('path')

module.exports = (req, res) => {

    const { image } = req.files;
    const uploadFile = path.resolve(__dirname, '../../../public/images/logos', image.name);

    image.mv(uploadFile, (error) => {
        Media.create(
            {
                ...req.body,
                image: `/images/logos/${image.name}`
            },
            (error, post) => {
                if (error) {
                    console.log(error);
                    req.flash('error', 'Erreur lors de la création de l\'article');
                } else {
                    req.flash('success', 'Article créé avec succes !');
                }
                res.redirect('/galleryDisplay')
            })
    })
}