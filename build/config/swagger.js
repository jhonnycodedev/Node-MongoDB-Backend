"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// Swagger definition
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation with JWT authentication',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./controllers/*.ts', './routes/*.ts'], // Paths to files containing OpenAPI definitions
};
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const specs = (0, swagger_jsdoc_1.default)(options);
// Define your routes here
const userRoutes = require('../src/routes/user');
const profileRoutes = require('../src/routes/profile');
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    app.use('/api/profiles', profileRoutes);
    app.use('/api/users', userRoutes);
    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}/`);
    });
};
exports.setupSwagger = setupSwagger;
