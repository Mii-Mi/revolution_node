module.exports = (req, res) => {
    const group = req.flash('data')[0];
    res.render('frontendView/mediaOwnerMap', { group })
}