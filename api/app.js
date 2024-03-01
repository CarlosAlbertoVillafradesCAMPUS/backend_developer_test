import express from "express"
import appUsers from "./routers/users.js";
import appHarvest from "./routers/harvest.js";
import appFerment from "./routers/ferment.js";
import { loadData, saveData } from "./model/index.js";
import { limitRequest } from "./config/limit_request.js";
import "dotenv/config"

const app = express();
const PORT = process.env.PORT || 20000;

app.use(express.json());
app.use(limitRequest())

app.use("/api/users", appUsers)
app.use("/api/harvest", appHarvest)
app.use("/api/ferment", appFerment)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
