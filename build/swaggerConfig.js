"use strict";
// swaggerConfig.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.servers = exports.securitySchemes = void 0;
exports.securitySchemes = {
    bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
    }
};
exports.servers = [
    {
        url: 'http://localhost:4000/api/v1',
        description: 'API Routes'
    }
];
