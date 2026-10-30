import { Router } from "express";
import {
  orderItemList,
  orderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from "../controllers/orderItemsControllers";
import { validarApiKey, middlewareOrderItems } from "../middlewares/orderItemsMiddlewares";

const router = Router();

router.get("/", orderItemList);
router.get("/:id", orderItemById);
router.post("/", validarApiKey, middlewareOrderItems, createOrderItem);
router.put("/:id", validarApiKey, middlewareOrderItems, updateOrderItem);
router.delete("/:id", validarApiKey, deleteOrderItem);

export default router;
