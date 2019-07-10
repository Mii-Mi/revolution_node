const Editos = require('../../../models/Editos')
let title = 'Modifier un édito'
module.exports = (req, res) => {
    Editos.findById(req.params.editoId, (error, edito) => {
        res.render('backendView/editos/edit', {layout: 'admin', edito, title})
    })
}