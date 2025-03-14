const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const petRoutes = require("./routes/petRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/pets", petRoutes)

// MongoDB connection
mongoose
	.connect(process.env.MONGODB_URI || "mongodb://mongodb:27017/pets")
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.error("MongoDB connection error:", error))

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).json({ message: "Something went wrong!" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
