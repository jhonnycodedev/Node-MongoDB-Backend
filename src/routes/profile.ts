import express, { Request, Response } from "express";
import ProfileController from "../controllers/profileController";
import { authenticateJWT } from "../../config/auth";

const router = express.Router();
const profileController = new ProfileController();

// Rota para criar um novo perfil
router.post("/create", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.create(req.body, req);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Rota para obter todos os perfis com paginação
router.get("/getAll", async (req: Request, res: Response) => {
  try {
    const { page, pageSize } = req.query;
    const response = await profileController.getAll(Number(page), Number(pageSize));
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Rota para buscar um perfil pelo ID
router.get("/findById/:id", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Rota para buscar o perfil do usuário autenticado pelo token
router.get("/findByToken", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const response = await profileController.findById(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Rota para atualizar um perfil
router.patch("/update", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.update(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error});
  }
});

// Rota para obter apenas campos específicos dos perfis
router.get("/fields", async (req: Request, res: Response) => {
  try {
    const response = await profileController.fields();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Rota para consultar perfis com dados populados do usuário
router.get("/query", async (req: Request, res: Response) => {
  try {
    const response = await profileController.query();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
