import express from 'express';

import { cart, products } from "../database/database.mjs";

export const cartRouter = express.Router();

cartRouter.post('/', (req, res) => {
    const {code, quantity} = req.body;
    cart.push({code, quantity});
    res.status(200).json({data: {code, quantity}});
});

cartRouter.get('/', (req, res) => {
  const carts = products.filter(product => {
    if (cart.find(cartItem => product.code.toString() === cartItem.code)) {
      return product;
    }
  });
  res.status(200).json({data: carts});
});

cartRouter.patch('/', (req, res) => {
  const {code, quantity} = req.body;
  const index = cart.findIndex(entry => entry.code === code);
  if(index !== -1) {
    const cartItem = cart[index];
    cartItem.quantity = quantity,
    res.status(200).json({data: {...cartItem}});
  } else {
    res.status(302).json({data: {code, msg: 'cart item is not available'}});
  }
});

cartRouter.put('/', (req, res) => {
  const {code, quantity} = req.body;
  let cartItem = cart.find(entry => entry.code === code);
  if(cartItem) {
    cartItem.quantity = quantity;
  } else {
    cartItem = {code, quantity}; 
    cart.push(cartItem);
  }
  res.status(200).json({data: {...cartItem}});
});

cartRouter.delete('/', (req, res) => {
  const {code} = req.body;
  cart = cart.filter(entry => entry.code === code);
  res.status(200).json({data: {code, msg: 'Item removed'}});
});