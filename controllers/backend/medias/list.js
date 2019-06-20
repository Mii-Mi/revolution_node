const Medias = require('../../../models/Medias')

module.exports = async (req, res) => {
    await Medias.find({}, null, { sort: { _id: -1 } }, (err, media) => {
        if (err) {
            console.log(err);
        }
        res.render('backendView/medias/list', { layout: 'admin', media })
    })
}
