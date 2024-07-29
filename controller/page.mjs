import { products } from "../database/database.mjs";

export const getDataForPage = (page, route, title) => {
  const navigation = links.filter((link) => link.role.includes("user"));
  return {
    redirection: route,
    title,
    navigation,
  };
};

export const getSearchPage = (req, res) => {
  const searchField = req.query.key;
  const productData = products.filter((product) => {
    return (
      product.description.includes(searchField) ||
      product.title.includes(searchField)
    );
  });
  res.render(LABELS.SEARCH.key, { ...getDataForPage(), data: productData });
};

export const getPDPPage = (req, res) => {
  res.render(LABELS.PDP.key, getDataForPage());
};


