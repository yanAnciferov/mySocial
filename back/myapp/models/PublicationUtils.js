var { paths }  = require("../constants/common");

var { buildPathToImage } = require("../scripts/utils");


function getPublicationForSend(publication, user){
    let { datePublication, imageBody, textBody } = publication;
    let { _id, firstname, surname, parrentname, minAvatar } = user;
    imageBody = imageBody ? buildPathToImage(publication.imageBody, user._id) : null;
    return{
        datePublication,
        imageBody,
        textBody,
        user: {
            _id,
            firstname,
            surname,
            parrentname,
            minAvatar
        }
    }
}

function getPublicationForSendWithUpdateUserAvatar(publication, user){
    let pubclication = getPublicationForSend(publication, user);
    let { user: { minAvatar, _id } } = pubclication;
    return {
        ...pubclication,
        user: {
            ...pubclication.user,
            minAvatar: minAvatar ? buildPathToImage(minAvatar, _id) : paths.PATH_TO_DEFAULT_AVATAR
        }
    }
}


module.exports.getPublicationForSendWithUpdateUserAvatar = getPublicationForSendWithUpdateUserAvatar;
module.exports.getPublicationForSend = getPublicationForSend;