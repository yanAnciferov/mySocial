var { userQueries }  = require("../constants/common");
var { PUBLICATION } = require( "../../constants/modelNames");
var { Publication } = require("../models/Publication");
var { getPublicationForSendWithUpdateUserAvatar }  = require("../models/PublicationUtils");


function getNews(req,res,next){
    let { user } = req;
    let idsForQUery = [];
    idsForQUery.push(user._id);
    idsForQUery = idsForQUery
        .concat(user.friends)
        .concat(user.outgoing);
    
    Publication.find({[PUBLICATION.USER]: { $in: idsForQUery } })
        .populate(PUBLICATION.USER ,userQueries.titleUserQuery)
        .sort(userQueries.DEC_DATE_PUBLICATE_SORT)
        .lean()
        .then(result => {
            res.send(
                result.map(
                    value => { return getPublicationForSendWithUpdateUserAvatar(value)}
                )
            );
        })
        .catch(err => {console.log(err)});
}

module.exports.getNews = getNews;