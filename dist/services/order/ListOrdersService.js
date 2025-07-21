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
exports.ListOrdersService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListOrdersService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch all orders from the database
            const orders = yield prisma_1.default.order.findMany({
                where: {
                    draft: false, // Only fetch orders that are not drafts
                    status: false, // Only fetch orders that are finished
                },
                include: {
                    items: {
                        include: {
                            product: true, // Inclui o produto em cada item
                        },
                    },
                },
            });
            // Se não houver pedidos, lança um erro
            if (!orders || orders.length === 0) {
                throw new Error("Nenhum pedido encontrado!");
            }
            // Return the list of orders
            return {
                orders: orders.map((order) => ({
                    id: order.id,
                    status: order.status,
                    draft: order.draft,
                    table: order.table,
                    name: order.name,
                })),
                message: "Pedidos listados com sucesso!",
            };
        });
    }
}
exports.ListOrdersService = ListOrdersService;
