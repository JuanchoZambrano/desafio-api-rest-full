import { Request, Response } from "express"
import { type Categoria, categorias, generarId } from '../data/categoriesData'

// validadId para un put y delete Number
function idDeRuta(param: string | string[] | undefined): number {
    const valor = Array.isArray(param) ? param[0] : param
    const id = Number(valor)
    if (isNaN(id) || id <= 0) {
        throw new Error('El ID debe ser un número entero positivo')
    }
    return id
}

function requeridoString(valor: unknown, campo: string): string {
    if (valor === undefined || valor === null || valor === '') {
        throw new Error(`El campo '${campo}' es obligatorio`)
    }
    return String(valor)
}

export const listarCategorias = (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Categorías']
        #swagger.summary = 'Listar categorías'
        #swagger.responses[200] = {
            description: 'Lista de categorías',
            schema: [{ id: 1, name: "Libros", description: ""}]
        }
        #swagger.responses[404] = {
            description: 'Categoría no encontrada',
            schema: { error: 'Categoría no encontrada' }
        }
        #swagger.responses[500] = {
            description: 'Error interno del servidor',
            schema: { error: 'Error interno del servidor' }
        }
    */
    try {
        if (categorias.length <= 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const obtenerCategoriaPorId = (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Categorías']
        #swagger.summary = 'Obtener categoría por ID'
        #swagger.parameters['id'] = { in: 'path', description: 'ID de la categoría', required: true, type: 'integer' }
        #swagger.responses[200] = { description: 'Categoría encontrada', schema: { id: 1, name: "Libros" } }
        #swagger.responses[404] = { description: 'Categoría no encontrada', schema: { error: 'Categoría no encontrada' } }
        #swagger.responses[400] = { description: 'El ID debe ser un número entero positivo', schema: { error: 'El ID debe ser un número entero positivo' } }
        #swagger.responses[500] = { description: 'Error interno del servidor', schema: { error: 'Error interno del servidor' } }
    */
    try {
        const id = idDeRuta(req.params.id);
        const indice = categorias.findIndex(c => c.id === id);
        if (indice === -1) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(200).json(categorias[indice]);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'El ID debe ser un número entero positivo') {
                res.status(400).json({ error: error.message });
            }
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

export const crearCategoria = (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Categorías']
        #swagger.summary = 'Crear categoría'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Datos de la categoría',
            required: true,
            schema: { name: "Libros", description: "Libros" }
        }
        #swagger.responses[201] = { description: 'Categoría creada', schema: { id: 4, name: "Libros", description: "Libros" } }
        #swagger.responses[400] = { description: 'El ID debe ser un número entero positivo', schema: { error: 'El ID debe ser un número entero positivo' } }
        #swagger.responses[422] = { description: 'El campo "nombre" o "descripción" es obligatorio', schema: { error: 'El campo "nombre" o "descripción" es obligatorio' } }
        #swagger.responses[500] = { description: 'Error interno del servidor', schema: { error: 'Error interno del servidor' }, schema: { error: 'Error interno del servidor' } }
    */
    try {
        const name = requeridoString(req.body.name, "nombre");
        const description = requeridoString(req.body.description, "descripción");
        const nuevaCategoria: Categoria = {
            id: generarId(),
            name: name,
            description: description
        };
        categorias.push(nuevaCategoria);
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'El ID debe ser un número entero positivo') {
                res.status(400).json({ error: error.message });
            } else {
                res.status(422).json({ error: error.message });
            }
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}
export const actualizarCategoria = (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Categorías']
        #swagger.summary = 'Actualizar categoría'
        #swagger.parameters['id'] = { in: 'path', description: 'ID de la categoría', required: true, type: 'integer' }
        #swagger.parameters['body'] = { in: 'body', description: 'Nuevos datos de la categoría', required: true, schema: { name: "Libros", description: "Libros" } }
        #swagger.responses[200] = { description: 'Categoría actualizada', schema: { id: 1, name: "Libros", description: "Libros" } }
        #swagger.responses[404] = { description: 'Categoría no encontrada', schema: { error: 'Categoría no encontrada' } }
        #swagger.responses[400] = { description: 'El ID debe ser un número entero positivo', schema: { error: 'El ID debe ser un número entero positivo' } }
        #swagger.responses[422] = { description: 'El campo "nombre" o "descripción" es obligatorio', schema: { error: 'El campo "nombre" o "descripción" es obligatorio' } }
        #swagger.responses[500] = { description: 'Error interno del servidor', schema: { error: 'Error interno del servidor' } }
    */
    try {
        const id = idDeRuta(req.params.id);
        const categoria = categorias.find(c => c.id === id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        const name = requeridoString(req.body.name, "nombre");
        const description = requeridoString(req.body.description, "descripción");
        categoria.name = name;
        categoria.description = description;
        res.status(200).json(categoria);
    } catch (error) {

        if (error instanceof Error) {
            if (error.message === 'El ID debe ser un número entero positivo') {
                res.status(400).json({ error: error.message });
            } else {
                res.status(422).json({ error: error.message });
            }
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}
export const eliminarCategoriaPermanente = (req: Request, res: Response) => {
    /*
        #swagger.tags = ['Categorías']
        #swagger.summary = 'Eliminar categoría'
        #swagger.parameters['id'] = { in: 'path', description: 'ID de la categoría', required: true, type: 'integer' }
        #swagger.responses[200] = { description: 'Categoría eliminada', schema: { message: 'Categoría eliminada' } }
        #swagger.responses[404] = { description: 'Categoría no encontrada', schema: { error: 'Categoría no encontrada' } }
        #swagger.responses[400] = { description: 'El ID debe ser un número entero positivo', schema: { error: 'El ID debe ser un número entero positivo' } }
        #swagger.responses[500] = { description: 'Error interno del servidor', schema: { error: 'Error interno del servidor' } }
    */
    try {
        const id = idDeRuta(req.params.id);
        const indice = categorias.findIndex(c => c.id === id);
        if (indice === -1) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        const categoria = categorias[indice];
        categorias.splice(indice, 1);
        res.status(200).json(categoria);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'El ID debe ser un número entero positivo') {
                res.status(400).json({ error: error.message });
            }
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}