//controllers/userController.ts

import { Body, Get, Patch, Delete, Post, Route, Security } from "tsoa";
import { UserService } from "../services/userService";
import { JsonObject } from "swagger-ui-express";

//-----------------------------------------------------------------------------------------------//
@Route("api/users")
export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }


//-----------------------------------------------------------------------------------------------//


  @Post("/register")
  public async register(@Body() body: {
  username:string;
  lastname: string;
  email: string;
  password: string;
  }): Promise<JsonObject> {
    try {
      const token = await this.userService.createUser(body);
      return { token: token, message: true };
    } catch (error: any) {
      return {
        error: error.message,
    };
  }
}


//-----------------------------------------------------------------------------------------------//


  @Post("/login")
  public async login(@Body() body: { 
    email: string; 
    password: string 
  }): Promise<JsonObject> {
    try {
      const token = await this.userService.loginUser(body.email, body.password);
      return { token: token, message: true };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

//-----------------------------------------------------------------------------------------------//


  @Get("/findAll")
  @Security("bearerAuth") 
  public async findAll(): Promise<JsonObject> {
    try {
      const users = await this.userService.findAllUsers();
      return { users: users };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }


 //-----------------------------------------------------------------------------------------------//
 
 
  @Get("/findById/{id}")
  @Security("bearerAuth") 
  public async findById(id: string): Promise<JsonObject> {
    try {
      const user = await this.userService.findUserById(id);
      return { user: user };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }


//-----------------------------------------------------------------------------------------------//


  @Patch("/update")
  @Security("bearerAuth") 
  public async update(@Body() body: {
    id: string;
    username?:string;
    lastname?: string;
    email?: string;
    password?: string;
  }): Promise<JsonObject> {
    try {
      const result = await this.userService.updateUser(body);
      return { result: result };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }


//-----------------------------------------------------------------------------------------------//


  @Delete("/delete/{id}")
  @Security("bearerAuth") 
  public async delete(id: string): Promise<JsonObject> {
    try {
      const user = await this.userService.deleteUser(id);
      return { data: user };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

//-----------------------------------------------------------------------------------------------//


}