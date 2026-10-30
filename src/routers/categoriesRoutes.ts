// branch feature/productos-crud
// branch feature/swagger-setup-categorias
// branch feature/middlewares-categorias
import { Router, type Request, type Response } from 'express';
import { listarCategorias, obtenerCategoriaPorId, crearCategoria, actualizarCategoria, eliminarCategoriaPermanente} from '../controllers/categoriesControllers'
const router: Router = Router();

// GET /api/categorias - Listar todas las categorías
router.get('/', listarCategorias);

// GET /api/categorias/:id - Obtener categoría por ID
router.get('/:id', obtenerCategoriaPorId);

// POST /api/categorias - Crear categoría
router.post('/', crearCategoria);

// PUT /api/categorias/:id - Actualizar categoría
router.put('/:id', actualizarCategoria);

// DELETE /api/categorias/:id - Eliminar categoría
router.delete('/:id', eliminarCategoriaPermanente);

export default router;