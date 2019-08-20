const Medias = require('../../../models/Medias')

module.exports = async (req, res) => {
    
    let title = 'Liste de medias libres - '
    const media = await Medias.find({})

    res.render('frontendView/medias/gallery', { media, title })
}