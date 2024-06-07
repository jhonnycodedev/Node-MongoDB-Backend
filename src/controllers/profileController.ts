// controllers/profileController.ts

import { Body, Get, Patch, Delete, Post, Route, Security, Request} from "tsoa";
import { ProfileService } from "../services/profileService";
import { JsonObject } from "swagger-ui-express";

interface ProfileData {
  id: string;
  username?: string;
  description?: string;
  skills?: string;
  education?: string;
  certifications?: string;
  github?: string;
  linkedin?: string;
  image?: string;
  userId: string;
}

@Route("api/profiles")
export default class ProfileController {
  private profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

@Post("/create")
@Security("bearerAuth")
public async create(

  @Body() body: ProfileData,
  @Request() req: any // Adicione o decorator @Request para obter acesso ao objeto de requisição

): Promise<{ message: string; result?: any }> { // Ajuste o tipo de retorno

  try {
    
    const userId = req.user.id; // Obtenha o ID do usuário decodificado do token

    const profileData = { ...body, userId }; // Adicione o userId aos dados do perfil

    const result = await this.profileService.createProfile(profileData);

    return result; // Retorna o resultado da criação do perfil
  } catch (error: any) {
    return { message: error.message || "Unknown error" }; // Retorna uma mensagem de erro em caso de falha
  }
}


  @Get("/getAll")
  @Security("bearerAuth")
  public async all(): Promise<JsonObject> {
    try {
      const profiles = await this.profileService.getAllProfiles();
      return profiles;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
  
  @Get("/findById/{id}")
  @Security("bearerAuth")
  public async findById(id: string): Promise<JsonObject> {
    try {
      const user = await this.profileService.findProfileByUserId(id);
      return { user: user };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }


  @Patch("/update")
@Security("bearerAuth")
public async update(@Body() body: ProfileData): Promise<JsonObject> {
  try {
    const result = await this.profileService.updateProfile(body);
    return { result: result };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}


  @Delete("/delete/:id")
  @Security("bearerAuth")
  public async delete(id: string): Promise<JsonObject> {
    try {
      const profile = await this.profileService.deleteProfile(id);
      return { data: profile };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Get("/fields")
  public async fields(): Promise<JsonObject> {
    try {
      const profiles = await this.profileService.getProfileFields();
      return profiles;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Get("/query")
  public async query(): Promise<JsonObject> {
    try {
      const profiles = await this.profileService.queryProfiles();
      return profiles;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
}
