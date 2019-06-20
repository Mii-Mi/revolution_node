const Editos = require('../../../models/Editos')

module.exports = (req, res) => {
    const query = { _id: req.params.editoId };

    Editos.findOneAndUpdate(
        query,
        {
            active: true,
        },
        (error, edito) => {
            if (error) {
                req.flash('error', 'L\' activation a échoué, veuillez réessayer.')
                console.log(error);
                return res.redirect(`/edito/list`)
            } else {
                req.flash('success', 'Edito activé avec succès.')
                res.redirect('/')
            }
        }
    )
}