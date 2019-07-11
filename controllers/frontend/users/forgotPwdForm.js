module.exports = (req, res) => {
    let title = 'Mot de passe oublié - saisie adresse mail - '
    res.render('frontendView/users/forgotPwdForm', {title})
}