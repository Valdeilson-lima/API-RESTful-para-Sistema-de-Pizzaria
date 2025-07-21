"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcrypt_1 = require("bcrypt");
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            // Validate input
            if (!name || !email || !password) {
                throw new Error("Preencha todos os campos");
            }
            // Check if email is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Formato de Email inválido");
            }
            // Check if user already exists
            const userAlreadyExists = yield prisma_1.default.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (userAlreadyExists) {
                throw new Error("Já existe um usuário cadastrado com esse e-mail");
            }
            const passwordHash = yield (0, bcrypt_1.hash)(password, 8);
            // Create new user
            const user = yield prisma_1.default.user.create({
                data: {
                    name,
                    email,
                    password: passwordHash,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                },
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
