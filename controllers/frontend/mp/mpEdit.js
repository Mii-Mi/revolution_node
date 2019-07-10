const Mp = require('../../../models/Mp');

module.exports = (req, res) => {

    let title ='Modifier un message privé - '
    Mp.findById(req.params.mpId, (error, mp) => {

        res.render('frontendView/private/edit', { mp, title })
    })
}