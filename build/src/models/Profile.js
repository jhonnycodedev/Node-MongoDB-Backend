"use strict";
// models/Profile.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define o esquema do Mongoose com base na interface
const profileSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    education: {
        type: [String],
        required: true
    },
    certifications: {
        type: [String],
        required: true
    },
    contact: {
        github: {
            type: String,
            required: true
        },
        linkedin: {
            type: String,
            required: true
        },
    },
    image: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: "User"
    }
});
exports.ProfileModel = mongoose_1.default.model("Profile", profileSchema);
