// routes/profile.ts

import express, { Request, Response } from "express";
import ProfileController from "../controllers/profileController";
import { authenticateJWT } from "../../config/auth";

const router = express.Router();
const profileController = new ProfileController();

router.post("/create", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.create(req.body);
    res.status(200).send(response==="profile created sucessfully");
    res.status(401).send(response==="Unauthorized");
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


router.patch("/update", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const response = await profileController.update(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
    
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
