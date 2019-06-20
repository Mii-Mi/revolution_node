const Editos = require('../../../models/Editos')


module.exports = (req, res) => {

    const query = { _id: req.params.editoId };

    Editos.findOneAndUpdate(
        query,
        {
            ...req.body,
        },
        (error, edito) => {
            if (error) {
                req.flash('error', 'La modification a échoué, veuillez réessayer.')
                console.log(error);
                return res.redirect(`/edito/edit/${req.params.articleId}`)
            } else {
                req.flash('success', 'edito modifié avec succès.')
                res.redirect('/')
            }
        }
    )
}