import { useState } from "react"
import { createPet } from "../services/petService"

interface PetFormData {
	name: string
	species: string
	age: number
	breed: string
	description: string
}

const initialFormData: PetFormData = {
	name: "",
	species: "",
	age: 0,
	breed: "",
	description: "",
}

const AddPetForm = () => {
	const [formData, setFormData] = useState<PetFormData>(initialFormData)
	const [message, setMessage] = useState<{
		text: string
		type: "success" | "error"
	} | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await createPet(formData)
			setFormData(initialFormData)
			setMessage({ text: "Pet added successfully", type: "success" })
			setTimeout(() => setMessage(null), 3000)
		} catch {
			setMessage({ text: "Error adding pet", type: "error" })
			setTimeout(() => setMessage(null), 3000)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: name === "age" ? parseInt(value) || 0 : value,
		}))
	}

	return (
		<form onSubmit={handleSubmit} className="form">
			<div className="form-group">
				<label className="form-label">Name *</label>
				<input
					className="form-input"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Pet name"
					required
				/>
			</div>

			<div className="form-group">
				<label className="form-label">Species *</label>
				<input
					className="form-input"
					name="species"
					value={formData.species}
					onChange={handleChange}
					placeholder="Species"
					required
				/>
			</div>

			<div className="form-group">
				<label className="form-label">Age *</label>
				<input
					className="form-input"
					type="number"
					name="age"
					value={formData.age}
					onChange={handleChange}
					placeholder="Age"
					min="0"
					required
				/>
			</div>

			<div className="form-group">
				<label className="form-label">Breed</label>
				<input
					className="form-input"
					name="breed"
					value={formData.breed}
					onChange={handleChange}
					placeholder="Breed (optional)"
				/>
			</div>

			<div className="form-group">
				<label className="form-label">Description</label>
				<input
					className="form-input"
					name="description"
					value={formData.description}
					onChange={handleChange}
					placeholder="Description (optional)"
				/>
			</div>

			<button type="submit" className="button">
				Add Pet
			</button>

			{message && (
				<div className={message.type === "success" ? "success" : "error"}>
					{message.text}
				</div>
			)}
		</form>
	)
}

export default AddPetForm
