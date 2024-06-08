//index.ts
import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import { connect } from './services/database';
import userRoutes from "./routes/user";
import profileRoutes from './routes/profile';
import cors from "cors";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000; // Valor padrão para a porta
const databaseUrl = process.env.DATABASE_URL || "";

// Conectar ao banco de dados
connect(databaseUrl);

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Configurações de middleware
app.use(express.json());
app.use(express.static("public"));

// Configuração do Swagger
app.use(
  "/swagger", // endereço de onde o swagger responde
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

// Rotas
app.use('/api/profiles', profileRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});
