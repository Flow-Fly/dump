// Initialize Datadog tracer before importing other modules
require("./tracer")

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB:", err))

// Routes
const petRoutes = require("./routes/pets")
app.use("/api/pets", petRoutes)

// Add custom span for health check endpoint
app.get("/health", (req, res) => {
	const span = tracer.scope().active()
	if (span) {
		span.setTag("endpoint.type", "health_check")
	}
	res.status(200).json({ status: "healthy" })
})

// Error handling middleware
app.use((err, req, res, next) => {
	const span = tracer.scope().active()
	if (span) {
		span.setTag("error", true)
		span.setTag("error.message", err.message)
		span.setTag("error.stack", err.stack)
	}
	console.error(err.stack)
	res.status(500).json({ error: "Something went wrong!" })
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
