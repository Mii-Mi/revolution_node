module.exports = (req, res) => {
    let title = 'Propriétaires des medias mainstream en France - '
    res.render('frontendView/mediaOwnerMap', {title})
}