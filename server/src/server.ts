import app from "./app";
import express from "express";
import cors from "cors";
import { env } from "./utils/env";

// routes import

const port = env.PORT || 5000


// config middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ROUTES
app.get("/api/v1/healthCheck", (req, res) => {
    res.send("OK");
});



app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});