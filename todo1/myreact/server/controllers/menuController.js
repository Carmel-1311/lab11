import prisma from '../config/prisma.js';

export const getMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        type: true,
      },
      orderBy: {
        menuId: 'asc',
      },
    });

    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Cannot get menu data', error: error.message });
  }
};

export const createMenu = async (req, res) => {
  try {
    const { name, price, isBestSeller, typeId } = req.body;

    const menu = await prisma.menu.create({
      data: {
        name,
        price,
        isBestSeller: Boolean(isBestSeller),
        typeId: Number(typeId),
      },
    });

    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Cannot create menu', error: error.message });
  }
};
