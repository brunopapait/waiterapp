import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function createCategories(req: Request, res: Response) {
  const { icon, name } = req.body;

  try {
    const category = await Category.create({ icon, name });
    return res.status(201).json(category);
  } catch (error) {
    return res.sendStatus(500);
  }
}
