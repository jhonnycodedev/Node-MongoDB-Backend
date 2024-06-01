"use strict";
//services/database.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = (databaseUrl) => {
    mongoose_1.default.connect(databaseUrl);
    const database = mongoose_1.default.connection;
    database.on('error', (error) => {
        console.log(error);
    });
    database.once('connected', () => {
        console.log('Database Connected');
    });
};
exports.connect = connect;
