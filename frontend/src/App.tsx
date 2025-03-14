import PetList from "./components/PetList"
import AddPetForm from "./components/AddPetForm.tsx"
import "./styles/global.css"

function App() {
	return (
		<div className="container">
			<h1 className="heading">Pet Management System</h1>
			<AddPetForm />
			<PetList />
		</div>
	)
}

export default App
