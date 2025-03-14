const express = require("express")
const router = express.Router()
const {
	getAllPets,
	getPet,
	createPet,
	updatePet,
	deletePet,
} = require("../controllers/petController")

router.get("/", getAllPets)
router.get("/:id", getPet)
router.post("/", createPet)
router.put("/:id", updatePet)
router.delete("/:id", deletePet)

module.exports = router
