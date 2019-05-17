const Medias = require('../../../models/Medias'),
      path = require('path'),
      fs = require('fs');


module.exports = (req, res) => {

    const imageToDelete = `public${req.body.imageOld}`;
    const { image } = req.files;
    const uploadFile = path.resolve(__dirname, '../../../public/images/logos', image.name);

    const query = { _id: req.body.mediaId };

    image.mv(uploadFile, (error) => {
        Medias.findOneAndUpdate(
            query,
            {
                ...req.body,
                image: `/images/logos/${image.name}`
            },
            { useFindAndModify: false },
            (error, media) => {
                if(error){
                    req.flash('error', 'La modification a échoué, veuillez réessayer.')
                    console.log(error);
                    return res.redirect(`/medias/edit/${req.body.id}`)
                }else{
                    req.flash('success', 'Média modifié avec succès.')
                    res.redirect('/galleryDisplay')
                }
            }
        )
    });
    
    if (imageToDelete != `public/images/logos/${image.name}`) {
        fs.unlink(imageToDelete, function (err, result) {
            console.log(err);
        });
    }
}