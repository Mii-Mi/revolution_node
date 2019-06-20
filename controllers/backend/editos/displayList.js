const Editos = require('../../../models/Editos')

module.exports = async (req, res) => {
    await Editos.find({}, null, { sort: { _id: -1 } }, (err, edito) => {
        if (err) {
            console.log(err);
        }
        res.render('backendView/editos/list', {layout: 'admin', edito})
    })
}