import { getDb } from "../database/mongo/database-mongo.mjs";


export class Product {
  constructor(code,
    title,
    price,
    description,
    category,
    imageUrl,
    promotion,
    stock,
    rating,
    _id) {
    this.code = code;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.promotion = promotion;
    this.stock = stock;
    this.category = category;
    this.rating = rating;
    this._id = _id ? new mongoDb.ObjectId(_id) : null;
  }

  save() {
    const db = getDb();
    if(this._id) {
      return db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    } else {
        return db
            .collection("products")
            .insertOne(this)
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    }
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => products)
      .catch((err) => console.log(err));
  }

  static findByCode(code) {
    const db = getDb();
    return db
      .collection("products")
      .find({ code })
      .next()
      .then((product) => product)
      .catch((err) => console.log(err));
  }

  static delete(code) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ code })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
}
