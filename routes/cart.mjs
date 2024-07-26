import express from 'express';

import { cart } from "../database/database.mjs";

export const cartRouter = express.Router();

app.post('/', (req, res) => {
    const {code, quantity} = req.body;
    cart.push({code, quantity});
    res.status(200).json({data: {code, quantity}});
});

app.get('/', (req, res) => {
  res.status(200).json({data: cart});
});

app.patch('/', (req, res) => {
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

app.put('/', (req, res) => {
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

app.delete('/', (req, res) => {
  const {code} = req.body;
  cart = cart.filter(entry => entry.code === code);
  res.status(200).json({data: {code, msg: 'Item removed'}});
});