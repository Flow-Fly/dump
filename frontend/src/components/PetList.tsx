import { useEffect, useState } from "react"
import { Pet, getAllPets, deletePet } from "../services/petService"

const PetList = () => {
	const [pets, setPets] = useState<Pet[]>([])
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

	const handleDelete = async (id: string) => {
		try {
			await deletePet(id)
			await fetchPets()
			setMessage({ text: "Pet deleted successfully", type: "success" })
			setTimeout(() => setMessage(null), 3000)
		} catch {
			setMessage({ text: "Error deleting pet", type: "error" })
			setTimeout(() => setMessage(null), 3000)
		}
	}

	useEffect(() => {
		fetchPets()
	}, [])

	return (
		<div className="table-container">
			{message && (
				<div className={message.type === "success" ? "success" : "error"}>
					{message.text}
				</div>
			)}
			<table className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Species</th>
						<th>Age</th>
						<th>Breed</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{pets.map((pet) => (
						<tr key={pet._id}>
							<td>{pet.name}</td>
							<td>{pet.species}</td>
							<td>{pet.age}</td>
							<td>{pet.breed || "-"}</td>
							<td>
								<button
									className="button button-delete"
									onClick={() => pet._id && handleDelete(pet._id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default PetList
