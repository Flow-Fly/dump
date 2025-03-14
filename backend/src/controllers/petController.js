const Pet = require("../models/Pet")

// Get all pets
const getAllPets = async (req, res) => {
	try {
		const pets = await Pet.find({})
		res.status(200).json(pets)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get a single pet
const getPet = async (req, res) => {
	try {
		const pet = await Pet.findById(req.params.id)
		if (!pet) {
			return res.status(404).json({ message: "Pet not found" })
		}
		res.status(200).json(pet)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Create a new pet
const createPet = async (req, res) => {
	try {
		const pet = await Pet.create(req.body)
		res.status(201).json(pet)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// Update a pet
const updatePet = async (req, res) => {
	try {
		const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!pet) {
			return res.status(404).json({ message: "Pet not found" })
		}
		res.status(200).json(pet)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// Delete a pet
const deletePet = async (req, res) => {
	try {
		const pet = await Pet.findByIdAndDelete(req.params.id)
		if (!pet) {
			return res.status(404).json({ message: "Pet not found" })
		}
		res.status(200).json({ message: "Pet deleted successfully" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	getAllPets,
	getPet,
	createPet,
	updatePet,
	deletePet,
}
