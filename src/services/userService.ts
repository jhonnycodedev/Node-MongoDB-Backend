//services/userService.ts

import { UserModel } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { ProfileService } from "./profileService";

//-----------------------------------------------------------------------------------------------//

export class UserService {

  private profileService: ProfileService; // Adicione o profileService como propriedade
  
  constructor() {
    this.profileService = new ProfileService(); // Inicialize o profileService
  }

//-----------------------------------------------------------------------------------------------//

  public async createUser(userData: {
    username:string;
    lastname: string;
    email: string;
    password: string;
  }): Promise<string> {
    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = new UserModel({
      username:userData.username,
      lastname: userData.lastname,
      email: userData.email,
      password: hashedPassword,
    });

    try {
      await user.save();
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        config.jwtSecret,
        { expiresIn: "15m" }
      );
  
      return token;
    } catch (error: any) {
      return JSON.stringify(error);
    }
  }


//-----------------------------------------------------------------------------------------------//


  public async loginUser(email: string, password: string): Promise<string | null> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare the hashed password with the provided password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, {
      expiresIn: "15m",
    });

    return token;
  }

//-----------------------------------------------------------------------------------------------//


  public async findAllUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }


//-----------------------------------------------------------------------------------------------//

  public async findUserById(id: string) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }


//-----------------------------------------------------------------------------------------------//


  public async updateUser(userData: {
    id: string;
    username?:string;
    lastname?: string;
    email?: string;
    password?: string;
  }) {
    try {
      if (userData.password) {
        // Hash the new password before updating
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
      }

      const result = await UserModel.findByIdAndUpdate(userData.id, {
        email: userData.email,
        password: userData.password,
      }, { new: true });

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }


//-----------------------------------------------------------------------------------------------//


  public async deleteUser(id: string) {
    try {
      // Primeiro, remova o perfil associado ao usuário
      await this.profileService.deleteProfileByUserId(id);

      // Em seguida, delete o próprio usuário
      const user = await UserModel.findByIdAndDelete(id);

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

//-----------------------------------------------------------------------------------------------//

}

