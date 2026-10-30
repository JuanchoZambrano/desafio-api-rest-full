export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  createdAt: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  role?: 'admin' | 'customer';
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  role?: 'admin' | 'customer';
}

// 5 usuarios iniciales con el equipo de la Sala 4
export const users: User[] = [
  {
    id: 1,
    name: "Miguel Matamoros",
    email: "miguel@example.com",
    role: "admin",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Juan Zambrano",
    email: "juan@example.com",
    role: "admin",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Derlyz Flores",
    email: "derlyz@example.com",
    role: "customer",
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Roberto Trinidad",
    email: "roberto@example.com",
    role: "customer",
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "Ivan Jimenez",
    email: "ivan@example.com",
    role: "customer",
    createdAt: new Date().toISOString()
  }
];