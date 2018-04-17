var mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    owner_id: {
        type: String,
        required: true,
     },
    contactEmail:{
        type: String,
        required: true,
        trim: true,
    },
    contactNumber:{
        type: String
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    }

});
mongoose.model('Verification', verificationSchema);