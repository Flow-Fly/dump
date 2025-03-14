import axios from "axios"

const API_URL = "http://localhost:3000/api/pets"

export interface Pet {
	_id?: string
	name: string
	species: string
	age: number
	breed?: string
	description?: string
}

export const getAllPets = async () => {
	const response = await axios.get(API_URL)
	return response.data
}

export const getPet = async (id: string) => {
	const response = await axios.get(`${API_URL}/${id}`)
	return response.data
}

export const createPet = async (pet: Pet) => {
	const response = await axios.post(API_URL, pet)
	return response.data
}

export const updatePet = async (id: string, pet: Pet) => {
	const response = await axios.put(`${API_URL}/${id}`, pet)
	return response.data
}

export const deletePet = async (id: string) => {
	const response = await axios.delete(`${API_URL}/${id}`)
	return response.data
}
