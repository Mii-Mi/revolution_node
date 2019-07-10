module.exports = (req, res) => {
    let title = 'Ajouter une note interne - '
    res.render('backendView/notes/add', {layout:'admin'})
}