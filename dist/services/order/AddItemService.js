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
exports.AddItemService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class AddItemService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ orderId, productId, amount }) {
            // Validações
            if (!orderId || orderId === "") {
                throw new Error("Obrigatório informar o ID do pedido");
            }
            if (!productId || productId === "") {
                throw new Error("Obrigatório informar o ID do produto");
            }
            if (amount <= 0) {
                throw new Error("Obrigatório informar a quantidade do produto");
            }
            // Verifica se o pedido existe
            const orderExists = yield prisma_1.default.order.findUnique({
                where: {
                    id: orderId,
                },
            });
            if (!orderExists) {
                throw new Error("Pedido não encontrado");
            }
            // Adiciona o item ao pedido
            const orderItem = yield prisma_1.default.item.create({
                data: {
                    orderId: orderId,
                    productId: productId,
                    amount: amount,
                },
            });
            return {
                id: orderItem.id,
                orderId: orderItem.orderId,
                productId: orderItem.productId,
                amount: orderItem.amount,
                message: `Item adicionado ao pedido com sucesso!`,
            };
        });
    }
}
exports.AddItemService = AddItemService;
