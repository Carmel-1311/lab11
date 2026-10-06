import prisma from '../config/prisma.js';

export const getTypes = async (req, res) => {
  try {
    const types = await prisma.type.findMany({
      orderBy: {
        typeId: 'asc',
      },
    });

    res.json(types);
  } catch (error) {
    res.status(500).json({ message: 'Cannot get type data', error: error.message });
  }
};

export const createType = async (req, res) => {
  try {
    const { name } = req.body;

    const type = await prisma.type.create({
      data: {
        name,
      },
    });

    res.status(201).json(type);
  } catch (error) {
    res.status(500).json({ message: 'Cannot create type', error: error.message });
  }
};
