import { Request, Response } from "express";
import { Category } from "../../models/Category";
import { Product } from "../../models/Product";

export async function listProductsByCategory(req: Request, res: Response) {
  try {
    const {categoryId} = req.params;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(400).json({error: 'Category not found'});
    }

    const products = await Product.where('category').equals(categoryId);
    res.status(200).json(products);
  } catch (error) {
    return res.sendStatus(500);
  }
}
