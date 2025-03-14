const mongoose = require("mongoose")

const petSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		species: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		breed: {
			type: String,
			required: false,
		},
		description: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("Pet", petSchema)
