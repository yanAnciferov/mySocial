var { userQueries }  = require("../constants/common");
var { Query }  = require("mongoose");
var { Promise }  = require("mongoose");
var { updateUserAvatarPaths }  = require("./utils");
var { User } = require("../models/User");
var { changeUserForSearchRes } = require("../models/UserUtils");

function search(req, res, next){
    let { query: { query } } = req;
    if(!query) query = ""
    let reg = new RegExp(`${query}`, "i");
    
    User.find({ $or: [{firstname: reg}, {surname: reg}, {parrentname: reg}] }, userQueries.minUserQuery)
        .lean()
        .then(resultUsers => {
            res.send(resultUsers.map(value => {
                return changeUserForSearchRes(value, req.user);
            }));
        });
} 


module.exports = {
    search
}