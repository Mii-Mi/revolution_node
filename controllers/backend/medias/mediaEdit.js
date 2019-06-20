Medias = require('../../../models/Medias');

module.exports = async (req, res) => {
        
    const media = await Medias.findById(req.params.id);

    res.render('backendView/medias/edit', { layout:'admin', media });

}