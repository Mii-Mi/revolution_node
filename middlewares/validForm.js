module.exports = (req, res, next) => {
    if(!req.files) {
        req.flash('error', 'Veuillez sélectionner une image !');
        res.redirect(req.rawHeaders[11]); 
    }else{
        next()
    }
}