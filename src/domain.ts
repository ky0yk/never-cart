import z from 'zod';

export const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
});
export type Product = z.infer<typeof ProductSchema>;

const CartSchema = z.object({
    items: z.array(ProductSchema),
    totalPrice: z.number(),
});
export type Cart = z.infer<typeof CartSchema>;

export const toCart = (obj: Object): Cart => {
    return CartSchema.parse(obj);
};

export type CheckOutedCart = {
    items: Product[];
    orderId: string;
};

export const ProductIdSchema = z.string().uuid().brand('productId');
export type ProductId = z.infer<typeof ProductIdSchema>;
