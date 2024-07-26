import express from "express";

import {links, LABELS, REDIRECTION} from "../database/database.mjs";

export const pageRouter = express.Router();

const getDataForPage = (page, route, title) => {
  const navigation = links.filter((link) => link.role.includes("user"));
  const pageObject = {
    redirection: route,
    title,
    navigation,
  };
  switch (page) {
    case REDIRECTION.PRODUCTS:
      return { ...pageObject, data: products };
    default:
      return pageObject;
  }
};

app.get(REDIRECTION.PDP, (req, res) => {
  res.render(LABELS.PDP.key, {
    navigation: links.filter((link) => link.role.includes("user")),
    redirection: REDIRECTION.PDP,
    title: LABELS.PDP.value,
  });
});

app.get(REDIRECTION.SEARCH, (req, res) => {
  const searchField = req.query.key;
  const productData = products.filter((product) => {
    return (
      product.description.includes(searchField) ||
      product.title.includes(searchField)
    );
  });
  res.render(LABELS.SEARCH.key, {
    navigation: links.filter((link) => link.role.includes("user")),
    redirection: REDIRECTION.SEARCH,
    title: LABELS.SEARCH.value,
    data: productData,
  });
});

for (const page in REDIRECTION) {
  if (Object.hasOwnProperty.call(REDIRECTION, page)) {
    const route = REDIRECTION[page];
    app.get(route, (rew, res) => {
      const { key, value: title } = LABELS[page];
      const pageObject = {
        ...getDataForPage(route, route, title),
      };
      res.render(key, pageObject);
    });
  }
}
