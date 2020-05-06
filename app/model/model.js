const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    uid: {
        type: String,
    },
    image: {
        type:String,
    },
    
});
module.exports = mongoose.model("users", userSchema);