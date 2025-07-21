"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
// Controllers User
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
// Middleware
const isauthenticated_1 = require("./middlewares/isauthenticated");
const multer_2 = __importDefault(require("./config/multer"));
// Controllers Category
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
// Controllers Product
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
// Controllers Order
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrdersController_1 = require("./controllers/order/ListOrdersController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)(multer_2.default.upload("product-images"));
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post("/users", new CreateUserController_1.CreateUserController().handle);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 */
router.post("/login", new AuthUserController_1.AuthUserController().handle);
/**
 * @swagger
 * /user/detail:
 *   get:
 *     summary: Get user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details returned successfully
 */
router.get("/user/detail", isauthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
// Category Routes
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category created successfully
 */
router.post("/category", isauthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
/**
 * @swagger
 * /category/list:
 *   get:
 *     summary: List all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories listed successfully
 */
router.get("/category/list", isauthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
// Product Routes
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */
/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               description:
 *                 type: string
 *               category_id:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product created successfully
 */
router.post("/product", isauthenticated_1.isAuthenticated, upload.single("file"), new CreateProductController_1.CreateProductController().handle);
/**
 * @swagger
 * /category/products:
 *   get:
 *     summary: List all products in a category
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Products listed successfully
 */
router.get("/category/products", isauthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
// Order Routes
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */
/**
 * @swagger
 * /order/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               table:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order created successfully
 */
router.post("/order/create", isauthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
/**
 * @swagger
 * /order/remove:
 *   delete:
 *     summary: Remove an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order removed successfully
 */
router.delete("/order/remove", isauthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
/**
 * @swagger
 * /order/add-item:
 *   post:
 *     summary: Add an item to an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *               amount:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item added successfully
 */
router.post("/order/add-item", isauthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle);
/**
 * @swagger
 * /order/remove-item:
 *   delete:
 *     summary: Remove an item from an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: item_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: Item removed successfully
 */
router.delete("/order/remove-item", isauthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle);
/**
 * @swagger
 * /order/send:
 *   put:
 *     summary: Send an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order sent successfully
 */
router.put("/order/send", isauthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
/**
 * @swagger
 * /orders/list:
 *   get:
 *     summary: List all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders listed successfully
 */
router.get("/orders/list", isauthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle);
/**
 * @swagger
 * /order/detail:
 *   get:
 *     summary: Get order details
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order details returned successfully
 */
router.get("/order/detail", isauthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
/**
 * @swagger
 * /order/finish:
 *   put:
 *     summary: Finish an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order finished successfully
 */
router.put("/order/finish", isauthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
exports.default = router;
