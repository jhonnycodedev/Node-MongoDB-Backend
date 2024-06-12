"use strict";
// routes/profile.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = __importDefault(require("../controllers/profileController"));
const auth_1 = require("../../config/auth");
const router = express_1.default.Router();
const profileController = new profileController_1.default();
router.post("/create", auth_1.authenticateJWT, async (req, res) => {
    try {
        const response = await profileController.create(req.body, req);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
router.get("/getAll", auth_1.authenticateJWT, async (req, res) => {
    try {
        const response = await profileController.all();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
router.get("/findById/:id", auth_1.authenticateJWT, async (req, res) => {
    try {
        const response = await profileController.findById(req.params.id);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// Atualize a rota findByToken para usar o token decifrado do middleware de autenticação
router.get("/findByToken", auth_1.authenticateJWT, async (req, res) => {
    try {
        // O middleware authenticateJWT adiciona o usuário ao objeto de requisição
        const userId = req.user.id; // Certifique-se de que o tipo req é coerente com AuthenticatedRequest
        console.log("User ID from request:", userId);
        const response = await profileController.findById(userId); // Use um método que busca pelo userId
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
router.patch("/update", auth_1.authenticateJWT, async (req, res) => {
    try {
        const response = await profileController.update(req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
router.get("/fields", async (req, res) => {
    try {
        const response = await profileController.fields();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
router.get("/query", async (req, res) => {
    try {
        const response = await profileController.query();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.default = router;
