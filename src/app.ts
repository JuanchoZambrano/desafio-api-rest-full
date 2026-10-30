import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error-handlers";
import { requestLogger } from "./middlewares/request-logger";
import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
// Agregar: import ... from ...
import orderItemsRoutes from "./routers/orderItemsRoutes";

dotenv.config();

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./swagger_output.json"), "utf8"),
);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Agregar: app.use...
app.use("/api/orderItems", orderItemsRoutes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;
