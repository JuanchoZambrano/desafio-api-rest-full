import { Request, Response } from 'express';
import { users, User, CreateUserDTO, UpdateUserDTO } from '../data/users';

// GET - Obtener todos los usuarios
export const getAllUsers = (req: Request, res: Response): void => {
  res.status(200).json(users);
};

// GET - Obtener usuario por ID
export const getUserById = (req: Request, res: Response): void => {
  const paramId = req.params.id as string;
  const id = parseInt(paramId, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'El ID debe ser un número válido' });
    return;
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    res.status(404).json({ error: `Usuario con ID ${id} no encontrado` });
    return;
  }

  res.status(200).json(user);
};

// POST - Crear un nuevo usuario
export const createUser = (req: Request, res: Response): void => {
  const { name, email, role } = req.body as CreateUserDTO;

  if (!name || !email) {
    res.status(400).json({ error: 'Nombre (name) y correo (email) son obligatorios' });
    return;
  }

  const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    res.status(400).json({ error: 'El correo electrónico ya se encuentra registrado' });
    return;
  }

  const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUser: User = {
    id: nextId,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: role || 'customer',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
};

// PUT - Actualizar usuario existente
export const updateUser = (req: Request, res: Response): void => {
  const paramId = req.params.id as string;
  const id = parseInt(paramId, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'El ID debe ser un número válido' });
    return;
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    res.status(404).json({ error: `Usuario con ID ${id} no encontrado` });
    return;
  }

  const { name, email, role } = req.body as UpdateUserDTO;

  if (email && email.toLowerCase() !== user.email.toLowerCase()) {
    const emailExists = users.some((u) => u.id !== id && u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      res.status(400).json({ error: 'El correo ya pertenece a otro usuario' });
      return;
    }
  }

  // Modificación directa y segura de propiedades
  if (name !== undefined) user.name = name.trim();
  if (email !== undefined) user.email = email.trim().toLowerCase();
  if (role !== undefined) user.role = role;

  res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
};

// DELETE - Eliminar usuario
export const deleteUser = (req: Request, res: Response): void => {
  const paramId = req.params.id as string;
  const id = parseInt(paramId, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'El ID debe ser un número válido' });
    return;
  }

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    res.status(404).json({ error: `Usuario con ID ${id} no encontrado` });
    return;
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.status(200).json({ message: 'Usuario eliminado exitosamente', user: deletedUser });
};