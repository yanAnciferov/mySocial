var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var  publicationSchema = new Schema({
    idPublisher: { type: String, required: true },
    datePublication: { type: Date, required: true },
    textBody: { type: String, default: "", required: false },
    imageBody: { type: String, default: null, required: false }
});



publicationSchema.statics = {
    createPublication(publication, callback){

        var Publication = this;
        var newPublication = new Publication(publication);
        return newPublication.save();
    }
}


exports.Publication = mongoose.model("Publication", publicationSchema);

