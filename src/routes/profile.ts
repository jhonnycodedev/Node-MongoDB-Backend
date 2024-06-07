// routes/profile.ts

import express, { Request, Response } from "express";
import ProfileController from "../controllers/profileController";
import { authenticateJWT } from "../../config/auth";

const router = express.Router();
const profileController = new ProfileController();


router.post("/create", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.create(req.body, req);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getAll", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.all();
    res.status(200).send(response);
    
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/findById/:id", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.findById(req.params.id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Atualize a rota findByToken para usar o token decifrado do middleware de autenticação
router.get("/findByToken", authenticateJWT, async (req: Request, res: Response) => {
  try {
    // O middleware authenticateJWT adiciona o usuário ao objeto de requisição
    const userId = (req as any).user.id; // Certifique-se de que o tipo req é coerente com AuthenticatedRequest
    console.log("User ID from request:", userId);
    const response = await profileController.findById(userId); // Use um método que busca pelo userId
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.patch("/update", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.update(req.body);
    res.status(200).send(response);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});


router.delete("/delete/:id", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.delete(req.params.id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/fields", async (req: Request, res: Response) => {
  try {
    const response = await profileController.fields();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/query", async (req: Request, res: Response) => {
  try {
    const response = await profileController.query();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
