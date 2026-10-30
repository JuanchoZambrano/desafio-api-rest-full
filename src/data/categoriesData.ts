export interface Categoria {
    id: number;
    name: string;
    description: string;
}

export let categorias: Categoria[] = [
    { id: 1, name: "Libros", description: "" },
    { id: 2, name: "Electrónica", description: "" },
    { id: 3, name: "Ropa", description: "" }
];

let nextId = 4;

export function generarId(): number {
    return nextId++;
}