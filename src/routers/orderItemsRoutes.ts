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

import {
  orderItemList,
  orderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from "../controllers/orderItemsControllers";
import { validarApiKey, middlewareOrderItems } from "../middlewares/orderItemsMiddlewares";

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", validateOrder, createOrder);
router.put("/:id", validateOrderUpdate, updateOrder);
router.delete("/:id", deleteOrder);

router.get("/", orderItemList);
router.get("/:id", orderItemById);
router.post("/", validarApiKey, middlewareOrderItems, createOrderItem);
router.put("/:id", validarApiKey, middlewareOrderItems, updateOrderItem);
router.delete("/:id", validarApiKey, deleteOrderItem);

export default router;