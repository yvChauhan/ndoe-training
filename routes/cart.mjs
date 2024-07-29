import express from 'express';

import { addProductToCart, deleteCart, getCart, modifyCart, updateCart } from '../controller/cart.mjs';

export const cartRouter = express.Router();

cartRouter.post('/', addProductToCart);

cartRouter.get('/', getCart);

cartRouter.patch('/', updateCart);

cartRouter.put('/', modifyCart);

cartRouter.delete('/', deleteCart);