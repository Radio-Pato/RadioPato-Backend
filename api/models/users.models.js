const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema(
	{
		name:String,
		surnames:String,
		email:String,
		address:String,
		building:String,
		password:String
	}
)
module.exports=mongoose.model("users",usersSchema)