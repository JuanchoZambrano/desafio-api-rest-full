import { Router } from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productsControllers";

const router = Router();

// Listar todos los productos
router.get("/", getProducts);

// Buscar un producto por ID
router.get("/:id", getProductById);

// Crear un producto
router.post("/", createProduct);

// Actualizar un producto
router.put("/:id", updateProduct);

// Eliminar un producto
router.delete("/:id", deleteProduct);

export default router;