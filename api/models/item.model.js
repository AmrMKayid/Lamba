var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: Number,
		required: true
    },
    likes_user_id: {
        type: Array,
		required: true
    },
    buyers_id: {
        type: Array,
		required: true
    },
	item_type: {
		type: String,
		required: true
	},
	item_condition:{
		type: String
	},
    picture_url:{
	 type: String,
	 required: true
	},
    seller_id: {
		type: Schema.Types.ObjectId,
		required: true        
    },
    created_at:{
        type: Date,
        required: true
    },
    updated_at:{
        type: Date, 
        required:true
    }  

});


mongoose.model('Item', ItemSchema);
