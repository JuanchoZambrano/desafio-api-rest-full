import { AppError } from './error-handlers';

// Valida el ID de la ruta (para GET por id, PUT y DELETE)
export function idDeRuta(param: string | string[] | undefined): number {
    const valor = Array.isArray(param) ? param[0] : param;
    const id = Number(valor);

    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError(400, 'El ID debe ser un número entero positivo');
    }

    return id;
}

// Valida que un campo del body venga con valor
export function requeridoString(valor: unknown, campo: string): string {
    if (valor === undefined || valor === null || valor === '') {
        throw new AppError(422, `El campo '${campo}' es obligatorio`);
    }

    return String(valor);
}