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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveItemController = void 0;
const RemoveItemService_1 = require("../../services/order/RemoveItemService");
class RemoveItemController {
    handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemId = req.query.itemId;
            const removeItemService = new RemoveItemService_1.RemoveItemService();
            try {
                const order = yield removeItemService.execute({
                    itemId,
                });
                return res.json(order);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.RemoveItemController = RemoveItemController;
