"use strict";
//routes.user.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = require("../../config/auth");
const router = express_1.default.Router();
const userController = new userController_1.default();
//-----------------------------------------------------------------------------------------------//
router.post("/register", async (req, res) => {
    try {
        const response = await userController.register(req.body);
        return res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
//-----------------------------------------------------------------------------------------------//
router.post("/login", async (req, res) => {
    try {
        const response = await userController.login(req.body);
        return res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
//-----------------------------------------------------------------------------------------------//
router.get("/findAll", auth_1.authenticateJWT, async (req, res) => {
    try {
        const response = await userController.findAll();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
//-----------------------------------------------------------------------------------------------//
router.get("/findById/:id", auth_1.authenticateJWT, async (req, res) => {
    try {
        const response = await userController.findById(req.params.id);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
//-----------------------------------------------------------------------------------------------//
router.patch("/update", auth_1.authenticateJWT, async (req, res) => {
    try {
        const response = await userController.update(req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
//-----------------------------------------------------------------------------------------------//
router.delete("/delete/:id", auth_1.authenticateJWT, async (req, res) => {
    try {
        const response = await userController.delete(req.params.id);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
//-----------------------------------------------------------------------------------------------//
exports.default = router;
