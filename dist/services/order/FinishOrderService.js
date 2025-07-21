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
exports.FinishOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class FinishOrderService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ orderId }) {
            // Validate if orderId is provided
            if (!orderId) {
                throw new Error("ID do pedido não enviado!");
            }
            // Update the order status to 'FINISHED'
            const updatedOrder = yield prisma_1.default.order.update({
                where: { id: orderId },
                data: { status: true },
            });
            // Return the updated order
            return {
                id: updatedOrder.id,
                status: updatedOrder.status,
                draft: updatedOrder.draft,
                table: updatedOrder.table,
                name: updatedOrder.name,
                createAt: updatedOrder.createdAt,
                updateAt: updatedOrder.updatedAt,
                message: "Pedido finalizado com sucesso!",
            };
        });
    }
}
exports.FinishOrderService = FinishOrderService;
