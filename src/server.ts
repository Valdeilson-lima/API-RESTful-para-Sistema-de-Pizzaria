import express, { Request, Response, NextFunction } from "express";
import router from "./routes";
import cors from "cors";
import path from "path";
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger';

const app = express();
app.use(cors());

app.use(express.json());
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
