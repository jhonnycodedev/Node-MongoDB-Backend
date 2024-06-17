import express, { Request, Response } from "express";
import ProfileController from "../controllers/profileController";
import { authenticateJWT } from "../../config/auth";

const router = express.Router();
const profileController = new ProfileController();


//-----------------------------------------------------------------------------------------------//

// Rota para criar um novo perfil
router.post("/create", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.create(req.body, req);
    res.status(200).json(response);
  } catch (error:any) {
    res.status(400).json({ error: error.message  });
  }
});

//-----------------------------------------------------------------------------------------------//

// Rota para obter todos os perfis com paginação
router.get("/getAll", async (req: Request, res: Response) => {
  try {
    const { page, pageSize } = req.query;
    const response = await profileController.getAll(Number(page), Number(pageSize));
    res.status(200).json(response);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
});

//-----------------------------------------------------------------------------------------------//

// Rota para buscar um perfil pelo ID
router.get("/findById/:id", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.findById(req.params.id);
    res.status(200).json(response);
  } catch (error:any) {
    res.status(400).json({ error: error.message  });
  }
});

//-----------------------------------------------------------------------------------------------//

// Rota para buscar o perfil do usuário autenticado pelo token
router.get("/findByToken", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const response = await profileController.findById(userId);
    res.status(200).json(response);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
});

//-----------------------------------------------------------------------------------------------//

// Rota para atualizar um perfil
router.patch("/update", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.update(req.body);
    res.status(200).json(response);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
});

//-----------------------------------------------------------------------------------------------//

// Rota para obter apenas campos específicos dos perfis
router.get("/fields", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.fields();
    res.status(200).json(response);
  } catch (error:any) {
    res.status(400).json({ error: error.message  });
  }
});

//-----------------------------------------------------------------------------------------------//

// Rota para consultar perfis com dados populados do usuário
router.get("/query", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.query();
    res.status(200).json(response);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
});

//-----------------------------------------------------------------------------------------------//

router.get('/search', async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword as string;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    
    const profiles = await profileController.searchProfiles(keyword, page, pageSize);
    res.status(200).json(profiles);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

//-----------------------------------------------------------------------------------------------//

export default router;
