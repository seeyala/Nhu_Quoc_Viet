import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Create
export const createResource = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const resource = await prisma.resource.create({
      data: { name, description },
    });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error creating resource', error });
  }
};

// List
export const listResources = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const resources = await prisma.resource.findMany({
        where: name
        ? { name: { contains: name as string } }
        : undefined,
    });
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error listing resources', error });
  }
};

// Get
export const getResource = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const resource = await prisma.resource.findUnique({
        where: { id: Number(id) },
      });
  
      if (!resource) {
        res.status(404).json({ message: 'Resource not found' });
        return;
      }
  
      res.status(200).json(resource);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching resource', error });
    }
  };
  
// Update
export const updateResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const resource = await prisma.resource.update({
      where: { id: Number(id) },
      data: { name, description },
    });
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resource', error });
  }
};

// Delete
export const deleteResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.resource.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error });
  }
};
