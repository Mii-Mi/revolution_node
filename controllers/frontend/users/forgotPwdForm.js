module.exports = (req, res) => {
    let title = 'Mot de pass oublié : saisie adresse mail - '
    res.render('frontendView/users/forgotPwdForm', title)
}