module.exports = (req, res) => {

    if(req.flash('data')[0] == 'admin'){
        const admin = 0
        res.render('index', { admin })
    }else if(req.flash('data')[0] == 'member'){
        const member = 1
        res.render('index', { member })
    }else{
        res.render('index')
    }
}