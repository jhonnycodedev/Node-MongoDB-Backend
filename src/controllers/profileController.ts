// controllers/profileController.ts

import { Body, Get, Patch, Delete, Post, Route, Security, Request, Response, Query } from "tsoa";
import { ProfileService } from "../services/profileService";
import { JsonObject } from "swagger-ui-express";


//-----------------------------------------------------------------------------------------------//
interface ProfileData {
  id: string;
  name?: string;
  description?: string;
  skills?: string;
  education?: string;
  certifications?: string;
  github?: string;
  linkedin?: string;
  image?: string;
  userId: string;
};

//-----------------------------------------------------------------------------------------------//


@Route("api/profiles")
export default class ProfileController {
  private profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

//-----------------------------------------------------------------------------------------------//  

  @Post("/create")
  @Security("bearerAuth")
  public async create(
    @Body() body: ProfileData,
    @Request() req: any
  ): Promise<{ message: string; result?: any }> {
    try {
      const userId = req.user.id;
      const profileData = { ...body, userId };
      const result = await this.profileService.createProfile(profileData);
      return result;
    } catch (error: any) {
      return { message: error.message || "Unknown error" };
    }
  }

//-----------------------------------------------------------------------------------------------//  

  @Get("/getAll")
  @Security("bearerAuth")
  public async getAll(
    @Query() page: number = 1,
    @Query() pageSize: number = 10
  ): Promise<{ profiles: any[]; totalPages: number }> {
    try {
      const offset = (page - 1) * pageSize;
      const profiles = await this.profileService.getAllProfiles(offset, pageSize);
      const totalProfiles = await this.profileService.getTotalProfiles();
      const totalPages = Math.ceil(totalProfiles / pageSize);
      return { profiles, totalPages };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }


//-----------------------------------------------------------------------------------------------//

  @Get("/findById/{id}")
  @Security("bearerAuth")
  public async findById(id: string): Promise<JsonObject> {
    try {
      const user = await this.profileService.findProfileByUserId(id);
      return { user: user };
    } catch (error: any) {
      return { error: error.message };
    }
  }


//-----------------------------------------------------------------------------------------------//


  @Patch("/update")
  @Security("bearerAuth")
  public async update(@Body() body: ProfileData): Promise<JsonObject> {
    try {
      const result = await this.profileService.updateProfile(body);
      return { result: result };
    } catch (error: any) {
      return { error: error.message };
    }
  }


//-----------------------------------------------------------------------------------------------//


  @Delete("/delete/{id}")
  @Security("bearerAuth")
  public async delete(@Request() req: any, id: string): Promise<JsonObject> {
    try {
      const profile = await this.profileService.findProfileByUserId(id);
      if (profile.userId !== req.user.id) {
        throw new Error("Você não tem permissão para excluir este perfil");
      }
      await this.profileService.deleteProfileByUserId(id);
      return { message: "Usuário e perfil deletados com sucesso" };
    } catch (error: any) {
      return { error: error.message };
    }
  }


//-----------------------------------------------------------------------------------------------//


  @Get("/fields")
  public async fields(): Promise<JsonObject> {
    try {
      const profiles = await this.profileService.getProfileFields();
      return profiles;
    } catch (error: any) {
      return { error: error.message };
    }
  }


//-----------------------------------------------------------------------------------------------//


  @Get("/query")
  public async query(): Promise<JsonObject> {
    try {
      const profiles = await this.profileService.queryProfiles();
      return profiles;
    } catch (error: any) {
      return { error: error.message };
    }
  }

//-----------------------------------------------------------------------------------------------//
  
@Get('/search')
public async searchProfiles(@Query('keyword') keyword: string, @Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<JsonObject> {
  try {
    const profiles = await this.profileService.searchProfiles(keyword, page, pageSize);
    return profiles;
  } catch (error: any) {
    return { error: error.message };
  }
}

//-----------------------------------------------------------------------------------------------//

}
