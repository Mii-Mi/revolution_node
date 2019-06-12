const MpResp = require('../../models/MpResp');

module.exports = async (req, res) => {

    const mpResp = await MpResp.findById(req.params.mpRespId);

    if (req.flash('data')[0] == 'admin') {
        const admin = true
        res.render('frontendView/private/respEdit', { mpResp, admin })
    } else if (req.flash('data')[0] == 'member') {
        const member = true
        res.render('frontendView/private/respEdit', { mpResp, member })
    } else {
        res.render('frontendView/private/respEdit', { mpResp })
    }

}