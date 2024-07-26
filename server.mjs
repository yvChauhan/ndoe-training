import express from "express";
import bp from "body-parser";
import morgan from "morgan";
import { cartRouter } from "./routes/cart.mjs";
import { productsRouter } from "./routes/products.mjs";

const PORT = process.env.port || "3000";
const localHost = "localhost";

const { urlencoded, json } = bp;

const app = express();

app.use(express.static("public"));

// Initialize template engine
app.set("view engine", "ejs");
app.set("views", "pages");

// use middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(morgan("dev"));

app.use('/cart', cartRouter);
app.use('/products', productsRouter);
app.use('/', productsRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://${localHost}:${PORT}`);
});
