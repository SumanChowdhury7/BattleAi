import express from "express";
import useGraph from "./services/graph.ai.service.js"
import cors from "cors";

const app = express();
app.use(express.json())

app.use(cors());

app.get("/health", (req,res) =>{
    res.status(200).json({
        status: "ok"
    })
})

app.post("/use-graph", async (req, res) => {
    const { problem } = req.body;

    if (!problem || typeof problem !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid "problem" field.' });
    }

    const result = await useGraph(problem);
    res.status(200).json(result);
});

export default app;