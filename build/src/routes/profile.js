"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = __importDefault(require("../controllers/profileController"));
const auth_1 = require("../../config/auth");
const router = express_1.default.Router();
const profileController = new profileController_1.default();
//-----------------------------------------------------------------------------------------------//
// Rota para criar um novo perfil
router.post("/create", auth_1.authenticateJWT, async (req, res) => {
    try {
        const response = await profileController.create(req.body, req);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
//-----------------------------------------------------------------------------------------------//
// Rota para obter todos os perfis com paginação
router.get("/getAll", async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const response = await profileController.getAll(Number(page), Number(pageSize));
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
//-----------------------------------------------------------------------------------------------//
// Rota para buscar um perfil pelo ID
router.get("/findById/:id", auth_1.authenticateJWT, async (req, res) => {
    try {
        const response = await profileController.findById(req.params.id);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
//-----------------------------------------------------------------------------------------------//
// Rota para buscar o perfil do usuário autenticado pelo token
router.get("/findByToken", auth_1.authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        const response = await profileController.findById(userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
//-----------------------------------------------------------------------------------------------//
// Rota para atualizar um perfil
router.patch("/update", auth_1.authenticateJWT, async (req, res) => {
    try {
        const response = await profileController.update(req.body);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
//-----------------------------------------------------------------------------------------------//
// Rota para obter apenas campos específicos dos perfis
router.get("/fields", async (req, res) => {
    try {
        const response = await profileController.fields();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
//-----------------------------------------------------------------------------------------------//
// Rota para consultar perfis com dados populados do usuário
router.get("/query", async (req, res) => {
    try {
        const response = await profileController.query();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
//-----------------------------------------------------------------------------------------------//
router.get("/search", async (req, res) => {
    try {
        const { name, skills, education, certifications } = req.query;
        const response = await profileController.searchProfiles(name, skills, education, certifications);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//-----------------------------------------------------------------------------------------------//
exports.default = router;
