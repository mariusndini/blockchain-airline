const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flyerSchema = new Schema({
	name: String,
	address: String,
	reward: {
		public: String,
		private: String,
		balance: String
	},
	trips:[{
		ticket:String,
		luggage:[
			
		]}
	]
})

const flyer = mongoose.model('flyers', flyerSchema);

module.exports = flyer;

