const Editos = require('../../../models/Editos')

module.exports = (req, res) => {
    const query = { _id: req.params.editoId };

    Editos.findOneAndUpdate(
        query,
        {
            active: false,
        },
        (error, edito) => {
            if (error) {
                req.flash('error', 'La desactivation a échoué, veuillez réessayer.')
                console.log(error);
                return res.redirect(`/edito/list`)
            } else {
                req.flash('success', 'Edito désactivé avec succès.')
                res.redirect('/')
            }
        }
    )
}