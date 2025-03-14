import { useEffect, useState } from "react"
import { Pet, getAllPets, deletePet } from "../services/petService"
import PetDetails from "./PetDetails"

const PetList = () => {
	const [pets, setPets] = useState<Pet[]>([])
	const [selectedPetId, setSelectedPetId] = useState<string | null>(null)
	const [message, setMessage] = useState<{
		text: string
		type: "success" | "error"
	} | null>(null)

	const fetchPets = async () => {
		try {
			const data = await getAllPets()
			setPets(data)
		} catch {
			setMessage({ text: "Error fetching pets", type: "error" })
			setTimeout(() => setMessage(null), 3000)
		}
	}

	useEffect(() => {
		fetchPets()
	}, [])

	const handleDelete = async (id: string) => {
		if (window.confirm("Are you sure you want to delete this pet?")) {
			try {
				await deletePet(id)
				setPets(pets.filter((pet) => pet._id !== id))
				setMessage({ text: "Pet deleted successfully", type: "success" })
				setTimeout(() => setMessage(null), 3000)
			} catch {
				setMessage({ text: "Error deleting pet", type: "error" })
				setTimeout(() => setMessage(null), 3000)
			}
		}
	}

	return (
		<div className="pet-list">
			<h2>Pet List</h2>
			{message && (
				<div className={message.type === "success" ? "success" : "error"}>
					{message.text}
				</div>
			)}
			<div className="pet-grid">
				{pets.map((pet) => (
					<div key={pet._id} className="pet-card">
						<h3>{pet.name}</h3>
						<p>Species: {pet.species}</p>
						<p>Age: {pet.age}</p>
						<div className="button-group">
							<button
								className="button"
								onClick={() => pet._id && setSelectedPetId(pet._id)}>
								View Details
							</button>
							<button
								className="button button-secondary"
								onClick={() => handleDelete(pet._id!)}>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>

			{selectedPetId && (
				<PetDetails
					petId={selectedPetId}
					onClose={() => setSelectedPetId(null)}
					onUpdate={fetchPets}
				/>
			)}
		</div>
	)
}

export default PetList
