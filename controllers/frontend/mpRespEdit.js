const MpResp = require('../../models/MpResp');

module.exports = async (req, res) => {

    const mpResp = await MpResp.findById(req.params.mpRespId);

    res.render('frontendView/private/respEdit', { mpResp })

}