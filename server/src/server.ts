import app from "./app";
import express from "express";
import cors from "cors";
import { env } from "./utils/env";
import errorHandler from "./middlewares/errorHandler";

// routes import
import ContactRoutes from "./routes/contact.route"

const port = env.PORT || 5000

// CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:5173', // Vite dev server
        'http://localhost:3000', // Alternative frontend port
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// config middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/v1/contacts", ContactRoutes)
app.get("/api/v1/healthCheck", (req, res) => {
    res.send("OK");
});

// Global error handler
app.use(errorHandler)

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});