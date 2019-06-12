const Mp = require('../../models/Mp'),
      MpResp = require('../../models/MpResp')

module.exports = (req, res) => {

    Mp.findById(
        req.params.mpId,
        async (error, mp) => {
            if (error) {
                console.log(error);
            }

            let isOwner = false

            if (mp.authorId === req.session.userId) {
                isOwner = true;
            }

            await MpResp.find({ mpId: req.params.mpId }, (error, mpResp) => {
                if (error) {
                    console.log(error);
                }
                for (i = 0; i < mpResp.length; i++) {
                    if (mpResp[i].senderId === req.session.userId) {

                        mpResp[i] = {
                            _id: mpResp[i]._id,
                            content: mpResp[i].content,
                            senderName: mpResp[i].senderName,
                            senderId: mpResp[i].senderId,
                            mpId: mpResp[i].mpId,
                            createDate: mpResp[i].createDate,
                            formatDate: mpResp[i].formatDate,
                            isCommentOwner: true
                        }
                    }
                }

                req.session[`read` + req.params.mpId] = Date.now()

                if (isOwner || mp.destId === req.session.userId) {

                    res.render('frontendView/private/singleDisplay', { mp, isOwner, mpResp })

                } else {
                    req.flash('error', 'Vous n\'êtes pas autorisé à voir cette conversation !')
                    res.redirect('/')
                }
            })
        }
    )
}