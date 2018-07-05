var { paths }  = require("../constants/common");
var { buildPathToImage } = require("../scripts/utils");

function getPublicationForSend(publication){
    let { imageBody } = publication;
    imageBody = imageBody ? buildPathToImage(publication.imageBody, user._id) : null;
    return publication
}

function getPublicationForSendWithUpdateUserAvatar(publication){
    let pubclication = getPublicationForSend(publication);
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