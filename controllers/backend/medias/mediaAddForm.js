module.exports = (req, res) => {
    let title = 'Ajouter un media - '
    res.render('backendView/medias/add', {layout: 'admin', title})
}