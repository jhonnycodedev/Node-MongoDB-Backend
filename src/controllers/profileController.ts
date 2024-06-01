// controllers/profileController.ts

import { Body, Get, Patch, Delete, Post, Route, Security} from "tsoa";
import { ProfileService } from "../services/profileService";
import { JsonObject } from "swagger-ui-express";


@Route("api/profiles")
export default class ProfileController {
  private profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  @Post("/create")
  @Security("bearerAuth")
  public async create(@Body() body: {
    name: string;
    description: string;
    skills: string[];
    education: string[];
    certifications: string[];
    contact: { github: string; linkedin: string };
    image: string;
    userId: string;
  }): Promise<string> {
    return this.profileService.createProfile(body);
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
      const user = await this.profileService.findProfileById(id);
      return { user: user };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Patch("/update")
  @Security("bearerAuth")
  public async update(@Body() body: {
    id: string;
    name?: string;
    description?: string;
    skills?: string[];
    education?: string[];
    certifications?: string[];
    contact?: { github?: string; linkedin?: string };
    image?: string;
    userId?: string;
  }): Promise<JsonObject> {
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
