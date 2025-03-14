const bunyan = require("bunyan")
const logger = bunyan.createLogger({
	name: "pet-management-api",
	level: "trace",
})

const tracer = require("dd-trace").init({
	logger: {
		debug: (m) => logger.trace(m),
		error: (m) => logger.error(m),
	},
	service: "pet-management-api",
	// env: process.env.NODE_ENV || "development",
	// Sampling rate: 1.0 means all traces are collected
	// sampleRate: 1.0,
	// Enable log injection to correlate logs with traces
	// logInjection: true,
	// Enable runtime metrics
	// runtimeMetrics: true,
	// Tags that will be added to all spans
	debug: true,
	logInjection: true,
	port: 8126,
	tags: {
		"app.type": "web",
		"app.language": "nodejs",
	},
})

// Enable automatic instrumentation for common libraries

module.exports = tracer
