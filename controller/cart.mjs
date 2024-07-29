import { cart, products } from "../database/database.mjs";

export const addProductToCart = (req, res) => {
  const { code, quantity } = req.body;
  const index = products.findIndex((entry) => entry.code === code);
  if (index !== -1) {
    const isAlreadyAdded = cart.findIndex((entry) => entry.code === code) === -1;
    if(isAlreadyAdded) {
      updateCart(req, res);
    }
    cart.push({ code, quantity });
    res.status(200).json({ data: { cart } });
  } else {
    res.status(404).json({ data: { cart, message: 'No item found with product id' } });
  }
};

export const getCart = (req, res) => {
  res.status(200).json({ data: cart });
};

export const updateCart = (req, res) => {
  const { code, quantity } = req.body;
  const index = cart.findIndex((entry) => entry.code === code);
  if (index !== -1) {
    const cartItem = cart[index];
    (cartItem.quantity = quantity),
      res.status(200).json({ data: { ...cartItem } });
  } else {
    res.status(302).json({ data: { code, msg: "cart item is not available" } });
  }
};

export const modifyCart = (req, res) => {
  const { code, quantity } = req.body;
  let cartItem = cart.find((entry) => entry.code === code);
  if (cartItem) {
    cartItem.quantity = quantity;
  } else {
    cartItem = { code, quantity };
    cart.push(cartItem);
  }
  res.status(200).json({ data: { ...cartItem } });
};

export const deleteCart = (req, res) => {
  const { code } = req.body;
  cart = cart.filter((entry) => entry.code === code);
  res.status(200).json({ data: { code, msg: "Item removed" } });
};
