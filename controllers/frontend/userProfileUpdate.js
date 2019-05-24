const Profiles = require('../../models/Profiles'),
      path = require('path'),
      fs = require('fs');


module.exports = (req, res) => {

    // const imageToDelete = `public${req.body.imageOld}`;
    const { avatar } = req.files;
    const uploadFile = path.resolve(__dirname, '../../public/images/avatars', avatar.name);

    const query = { _id: req.body.profileId };

    image.mv(uploadFile, (error) => {
        Profile.findOneAndUpdate(
            query,
            {
                ...req.body,
                image: `/images/avatars/${avatar.name}`
            },
            (error, profile) => {
                if (error) {
                    req.flash('error', 'La modification a échoué, veuillez réessayer.')
                    console.log(error);
                    return res.redirect(`/profile/edit/${req.body.id}`)
                } else {
                    req.flash('success', 'Profil modifié avec succès.')
                    res.redirect(`/userProfile/${profile.userId}`)
                }
            }
        )
    });

    // if (imageToDelete != `public/images/logos/${image.name}`) {
    //     fs.unlink(imageToDelete, function (err, result) {
    //         console.log(err);
    //     });
    // }
}