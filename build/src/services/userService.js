"use strict";
//services/userService.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const profileService_1 = require("./profileService");
class UserService {
    constructor() {
        this.profileService = new profileService_1.ProfileService(); // Inicialize o profileService
    }
    async createUser(userData) {
        // Hash the password before saving the user
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(userData.password, salt);
        const user = new User_1.UserModel({
            name: userData.name,
            lastname: userData.lastname,
            email: userData.email,
            password: hashedPassword,
        });
        try {
            await user.save();
            // Generate a JWT token
            const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.default.jwtSecret, { expiresIn: "15m" });
            return token;
        }
        catch (error) {
            return JSON.stringify(error);
        }
    }
    async loginUser(email, password) {
        const user = await User_1.UserModel.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        // Compare the hashed password with the provided password
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.default.jwtSecret, {
            expiresIn: "15m",
        });
        return token;
    }
    async findAllUsers() {
        try {
            const users = await User_1.UserModel.find();
            return users;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findUserById(id) {
        try {
            const user = await User_1.UserModel.findById(id);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateUser(userData) {
        try {
            if (userData.password) {
                // Hash the new password before updating
                const salt = await bcrypt_1.default.genSalt(10);
                userData.password = await bcrypt_1.default.hash(userData.password, salt);
            }
            const result = await User_1.UserModel.findByIdAndUpdate(userData.id, {
                email: userData.email,
                password: userData.password,
            }, { new: true });
            return result;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteUser(id) {
        try {
            // Primeiro, remova o perfil associado ao usuário
            await this.profileService.deleteProfileByUserId(id);
            // Em seguida, delete o próprio usuário
            const user = await User_1.UserModel.findByIdAndDelete(id);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.UserService = UserService;
