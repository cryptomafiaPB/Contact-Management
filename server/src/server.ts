import app from "./app";
import express from "express";
import cors from "cors";
import { env } from "./utils/env";
import errorHandler from "./middlewares/errorHandler";

// routes import
import ContactRoutes from "./routes/contact.route"

const port = env.PORT || 5000


// config middlewares
app.use(cors());
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