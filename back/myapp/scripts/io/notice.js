var { getPublicationForSendWithUpdateUserAvatar }  = require("../../models/PublicationUtils");

var { buildPathToImage }  = require("../utils");

var { getIO } = require("./io");

var notifyAboutNewPublication = (sender, publication) => {
    let io = getIO();
    publication = getPublicationForSendWithUpdateUserAvatar(publication, sender);

    console.log("!!");
    io.sockets.in(sender._id).emit("newPublication", { publication  });
    
    let { friends, incoming } = sender;
    let lists = [friends, incoming];
    
   for (let i = 0; i < lists.length; i++) {
        for (let j = 0; j < lists[i].length; j++) {
            io.sockets.in(lists[i][j]).emit("newPublication", { publication });
        } 
   }

}

module.exports.notifyAboutNewPublication = notifyAboutNewPublication;