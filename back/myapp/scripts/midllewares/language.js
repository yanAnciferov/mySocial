

function changeLanguage(req, res, next){
    let { user } = req;
    user.language = req.body.language;
    user.save();
    res.sendStatus(200);
}

module.exports.changeLanguage = changeLanguage;