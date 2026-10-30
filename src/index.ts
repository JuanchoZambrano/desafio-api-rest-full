import { Router } from "express";
/* 
derlyz
mike
roberto*/
import productsRoutes from "./routers/productsRoutes";
/* juan */

//ejemplo: import orderItemsRoutes from './routers/orderItemRoutes'

const router = Router();

// importar routers de cada uno
/* 
derlyz
mike
roberto*/
router.use("/products", productsRoutes);
/* juan*/

export default router;