import express from "express";

import {links, LABELS, REDIRECTION} from "../database/database.mjs";
import { getDataForPage, getPDPPage, getSearchPage } from "../controller/page.mjs";

export const pageRouter = express.Router();

pageRouter.get(REDIRECTION.PDP, getPDPPage);

pageRouter.get(REDIRECTION.SEARCH, getSearchPage);

for (const page in REDIRECTION) {
  if (Object.hasOwnProperty.call(REDIRECTION, page)) {
    const route = REDIRECTION[page];
    pageRouter.get(route, (req, res) => {
      const { key, value: title } = LABELS[page];
      res.render(key, { ...getDataForPage(route, route, title) });
    });
  }
}