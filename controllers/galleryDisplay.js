const Medias = require('../models/Medias')

module.exports = async (req, res) => {
    const group = req.flash('data')[0];

    const media = await Medias.find({})
    
    res.render('frontendView/gallery', { media, group })
}