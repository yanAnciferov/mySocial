var { getPublicationForSendWithUpdateUserAvatar }  = require("../../models/PublicationUtils");

var { buildPathToImage }  = require("../utils");
var { NEW_PUBLICATION }  = require("../../constants/socketEvents");

var { getIO } = require("./io");

var notifyAboutNewPublication = (sender, publication) => {
    let io = getIO();
    publication.user = {
        _id: sender._id,
        firstname: sender.firstname,
        surname: sender.surname,
        parrentname: sender.parrentname,
        minAvatar: sender.minAvatar
    }
    publication = getPublicationForSendWithUpdateUserAvatar(publication);

    io.sockets.in(sender._id).emit(NEW_PUBLICATION, { publication  });
    
    let { friends, incoming } = sender;
    let lists = [friends, incoming];
    
   for (let i = 0; i < lists.length; i++) {
        for (let j = 0; j < lists[i].length; j++) {
            io.sockets.in(lists[i][j]).emit(NEW_PUBLICATION, { publication });
        } 
   }

}

module.exports.notifyAboutNewPublication = notifyAboutNewPublication;