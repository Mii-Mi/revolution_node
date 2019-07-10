module.exports = (req, res) => {
    let title = 'Ajouter un édito'
    res.render('backendView/editos/add', {layout: 'admin', title})
}