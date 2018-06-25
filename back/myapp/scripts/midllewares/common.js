

function finishSend(req,res,next){
    res.send(res.data);
}

module.exports.finishSend = finishSend;