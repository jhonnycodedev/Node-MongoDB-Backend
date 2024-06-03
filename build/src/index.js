"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./services/database");
const user_1 = __importDefault(require("./routes/user"));
const profile_1 = __importDefault(require("./routes/profile"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000; // Valor padrão para a porta
const databaseUrl = process.env.DATABASE_URL || "";
// Conectar ao banco de dados
(0, database_1.connect)(databaseUrl);
// Configuração do CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
// Configurações de middleware
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
// Configuração do Swagger
app.use("/swagger", // endereço de onde o swagger responde
swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
}));
// Rotas
app.use('/api/profiles', profile_1.default);
app.use("/api/users", user_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`);
});
