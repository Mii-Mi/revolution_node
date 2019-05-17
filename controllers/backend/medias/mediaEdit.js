    Medias = require('../../../models/Medias');

module.exports = async (req, res) => {
        
    const media = await Medias.findById(req.params.id);

    if (req.flash('data')[0] == 'admin') {
        const admin = true
        res.render('backendView/medias/edit', { admin, media });
    } else if (req.flash('data')[0] == 'member') {
        const member = true
        res.render('backendView/medias/edit', { member, media });
    } else {
        res.render('backendView/medias/edit', { media });
    }
}