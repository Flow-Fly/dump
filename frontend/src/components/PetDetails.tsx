import { useState, useEffect } from "react"
import { Pet, getPet, updatePet } from "../services/petService"

interface PetDetailsProps {
	petId: string
	onClose: () => void
	onUpdate: () => void
}

const PetDetails = ({ petId, onClose, onUpdate }: PetDetailsProps) => {
	const [pet, setPet] = useState<Pet | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [editedPet, setEditedPet] = useState<Pet | null>(null)
	const [message, setMessage] = useState<{
		text: string
		type: "success" | "error"
	} | null>(null)

	useEffect(() => {
		const fetchPet = async () => {
			try {
				const data = await getPet(petId)
				setPet(data)
				setEditedPet(data)
			} catch {
				setMessage({ text: "Error fetching pet details", type: "error" })
			}
		}
		fetchPet()
	}, [petId])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setEditedPet((prev) => {
			if (!prev) return null
			return {
				...prev,
				[name]: name === "age" ? parseInt(value) || 0 : value,
			}
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!editedPet || !pet?._id) return

		try {
			await updatePet(pet._id, editedPet)
			setPet(editedPet)
			setIsEditing(false)
			setMessage({ text: "Pet updated successfully", type: "success" })
			onUpdate()
			setTimeout(() => setMessage(null), 3000)
		} catch {
			setMessage({ text: "Error updating pet", type: "error" })
			setTimeout(() => setMessage(null), 3000)
		}
	}

	if (!pet) return null

	return (
		<div className="modal-overlay">
			<div className="modal">
				<button className="close-button" onClick={onClose}>
					×
				</button>
				<h2 className="modal-title">
					{isEditing ? "Edit Pet" : "Pet Details"}
				</h2>

				{isEditing ? (
					<form onSubmit={handleSubmit} className="form">
						<div className="form-group">
							<label className="form-label">Name *</label>
							<input
								className="form-input"
								name="name"
								value={editedPet?.name || ""}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="form-group">
							<label className="form-label">Species *</label>
							<input
								className="form-input"
								name="species"
								value={editedPet?.species || ""}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="form-group">
							<label className="form-label">Age *</label>
							<input
								className="form-input"
								type="number"
								name="age"
								value={editedPet?.age || 0}
								onChange={handleChange}
								min="0"
								required
							/>
						</div>

						<div className="form-group">
							<label className="form-label">Breed</label>
							<input
								className="form-input"
								name="breed"
								value={editedPet?.breed || ""}
								onChange={handleChange}
							/>
						</div>

						<div className="form-group">
							<label className="form-label">Description</label>
							<input
								className="form-input"
								name="description"
								value={editedPet?.description || ""}
								onChange={handleChange}
							/>
						</div>

						<div className="button-group">
							<button type="submit" className="button">
								Save Changes
							</button>
							<button
								type="button"
								className="button button-secondary"
								onClick={() => setIsEditing(false)}>
								Cancel
							</button>
						</div>
					</form>
				) : (
					<div className="pet-details">
						<div className="detail-row">
							<span className="detail-label">Name:</span>
							<span className="detail-value">{pet.name}</span>
						</div>
						<div className="detail-row">
							<span className="detail-label">Species:</span>
							<span className="detail-value">{pet.species}</span>
						</div>
						<div className="detail-row">
							<span className="detail-label">Age:</span>
							<span className="detail-value">{pet.age}</span>
						</div>
						{pet.breed && (
							<div className="detail-row">
								<span className="detail-label">Breed:</span>
								<span className="detail-value">{pet.breed}</span>
							</div>
						)}
						{pet.description && (
							<div className="detail-row">
								<span className="detail-label">Description:</span>
								<span className="detail-value">{pet.description}</span>
							</div>
						)}
						<button className="button" onClick={() => setIsEditing(true)}>
							Edit Pet
						</button>
					</div>
				)}

				{message && (
					<div className={message.type === "success" ? "success" : "error"}>
						{message.text}
					</div>
				)}
			</div>
		</div>
	)
}

export default PetDetails
