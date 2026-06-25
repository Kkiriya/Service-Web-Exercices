import express from "express";
import agentRoutes from "./routes/agent.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/agents", agentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

