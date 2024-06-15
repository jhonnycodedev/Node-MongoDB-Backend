"use strict";
//controllers/userController.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const userService_1 = require("../services/userService");
//-----------------------------------------------------------------------------------------------//
let UserController = class UserController {
    constructor() {
        this.userService = new userService_1.UserService();
    }
    //-----------------------------------------------------------------------------------------------//
    async register(body) {
        try {
            const token = await this.userService.createUser(body);
            return { token: token, message: true };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    //-----------------------------------------------------------------------------------------------//
    async login(body) {
        try {
            const token = await this.userService.loginUser(body.email, body.password);
            return { token: token, message: true };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    //-----------------------------------------------------------------------------------------------//
    async findAll() {
        try {
            const users = await this.userService.findAllUsers();
            return { users: users };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    //-----------------------------------------------------------------------------------------------//
    async findById(id) {
        try {
            const user = await this.userService.findUserById(id);
            return { user: user };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    //-----------------------------------------------------------------------------------------------//
    async update(body) {
        try {
            const result = await this.userService.updateUser(body);
            return { result: result };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    //-----------------------------------------------------------------------------------------------//
    async delete(id) {
        try {
            const user = await this.userService.deleteUser(id);
            return { data: user };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
};
__decorate([
    (0, tsoa_1.Post)("/register"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, tsoa_1.Post)("/login"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Get)("/findAll"),
    (0, tsoa_1.Security)("bearerAuth"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, tsoa_1.Get)("/findById/{id}"),
    (0, tsoa_1.Security)("bearerAuth"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    (0, tsoa_1.Patch)("/update"),
    (0, tsoa_1.Security)("bearerAuth"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)("/delete/{id}"),
    (0, tsoa_1.Security)("bearerAuth"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, tsoa_1.Route)("api/users"),
    __metadata("design:paramtypes", [])
], UserController);
exports.default = UserController;
