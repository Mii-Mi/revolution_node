module.exports = (req, res) => {
    let title = 'Ajouter un article - '
    res.render('frontendView/articles/add', {title})
}