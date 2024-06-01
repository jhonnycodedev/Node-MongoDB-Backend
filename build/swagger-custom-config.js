"use strict";
// swagger-custom-config.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.customSwaggerConfig = void 0;
exports.customSwaggerConfig = {
    "securitySchemes": {
        "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    },
    "servers": [
        {
            "url": "http://localhost:4000/api/v1",
            "description": "API Routes"
        }
    ]
};
