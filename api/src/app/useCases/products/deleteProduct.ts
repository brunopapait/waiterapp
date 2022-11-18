import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(400).json({error: 'Product not found'});
    }

    await Product.deleteOne({ where: { id } });
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}
