import { Router } from "express";
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} from "../controllers/ordersControllers";
import {
    validateOrder,
    validateOrderUpdate
} from "../middlewares/ordersMiddlewares";
const router = Router();
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", validateOrder, createOrder);
router.put("/:id", validateOrderUpdate, updateOrder);
router.delete("/:id", deleteOrder);
export default router;