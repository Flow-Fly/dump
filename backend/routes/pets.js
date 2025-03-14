const express = require("express")
const router = express.Router()
const Pet = require("../models/pet")
const tracer = require("../tracer")

// Get all pets
router.get("/", async (req, res) => {
	const span = tracer.startSpan("pets.list")
	try {
		const pets = await Pet.find()
		res.json(pets)
		tracer.inject(span.context())
	} catch (err) {
		span.setTag("error", true)
		span.setTag("error.message", err.message)
		res.status(500).json({ message: err.message })
	} finally {
		span.finish()
	}
})

// Get one pet
router.get("/:id", async (req, res) => {
	const span = tracer.startSpan("pets.get")
	span.setTag("pet.id", req.params.id)
	try {
		const pet = await Pet.findById(req.params.id)
		if (pet) {
			res.json(pet)
		} else {
			span.setTag("error", true)
			span.setTag("error.type", "not_found")
			res.status(404).json({ message: "Pet not found" })
		}
	} catch (err) {
		span.setTag("error", true)
		span.setTag("error.message", err.message)
		res.status(500).json({ message: err.message })
	} finally {
		span.finish()
	}
})

// Create pet
router.post("/", async (req, res) => {
	const newPet = await tracer.trace(
		"pet.make",
		{ resource: "/api/pets" },
		async () => {
			const ingredients = await tracer.trace(
				"get_ingredients",
				{ resource: "resource_name" },
				() => {
					return getIngredients()
				}
			)

			return tracer.trace(
				"assemble_sandwich",
				{ resource: "resource_name" },
				() => {
					return assembleSandwich(ingredients)
				}
			)
		}
	)

	res.end(sandwich)
	const span = tracer.startSpan("pets.create")
	const pet = new Pet({
		name: req.body.name,
		species: req.body.species,
		age: req.body.age,
		breed: req.body.breed,
		description: req.body.description,
	})
	span.setTag("pet.name", pet.name)
	span.setTag("pet.species", pet.species)

	try {
		const newPet = await pet.save()
		span.setTag("pet.id", newPet._id.toString())
		res.status(201).json(newPet)
	} catch (err) {
		span.setTag("error", true)
		span.setTag("error.message", err.message)
		res.status(400).json({ message: err.message })
	} finally {
		span.finish()
	}
})

// Update pet
router.patch("/:id", async (req, res) => {
	const span = tracer.startSpan("pets.update")
	span.setTag("pet.id", req.params.id)
	try {
		const pet = await Pet.findById(req.params.id)
		if (!pet) {
			span.setTag("error", true)
			span.setTag("error.type", "not_found")
			return res.status(404).json({ message: "Pet not found" })
		}

		Object.keys(req.body).forEach((key) => {
			if (req.body[key] != null) {
				pet[key] = req.body[key]
			}
		})

		const updatedPet = await pet.save()
		res.json(updatedPet)
	} catch (err) {
		span.setTag("error", true)
		span.setTag("error.message", err.message)
		res.status(400).json({ message: err.message })
	} finally {
		span.finish()
	}
})

// Delete pet
router.delete("/:id", async (req, res) => {
	const span = tracer.startSpan("pets.delete")
	span.setTag("pet.id", req.params.id)
	try {
		const pet = await Pet.findById(req.params.id)
		if (!pet) {
			span.setTag("error", true)
			span.setTag("error.type", "not_found")
			return res.status(404).json({ message: "Pet not found" })
		}

		await pet.deleteOne()
		res.json({ message: "Pet deleted" })
	} catch (err) {
		span.setTag("error", true)
		span.setTag("error.message", err.message)
		res.status(500).json({ message: err.message })
	} finally {
		span.finish()
	}
})

module.exports = router
