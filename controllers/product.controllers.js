const productModel = require("../model/product.model");
async function get(req, res) {
  try {
    const products = await productModel.find();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {
    console.log(error);
  }
}
async function create(req, res) {
  try {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const product = {
        id: Date.now(),
        ...JSON.parse(body),
      };
      const result = await productModel.create({ product });
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(result));
      res.end();
    });
  } catch (error) {
    console.log(error);
  }
}
async function update(req, res) {
  try {
    let body = "";
    const [, , , id] = req.url.split("/");
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const parsedBody = {
        ...JSON.parse(body),
      };
      const product = await productModel.findById(id);
      if (!product) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Not Found Any Product" }));
        res.end();
      } else {
        const result = await productModel.update(id, parsedBody);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(result));
        res.end();
      }
    });
  } catch (error) {
    console.log(error);
  }
}
async function getById(req, res) {
  try {
    const [, , , id] = req.url.split("/");
    const products = await productModel.findById(id);
    if (!products) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Not Found Any Product" }));
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(products));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}
async function remove(req, res) {
  try {
    const [, , , id] = req.url.split("/");
    const products = await productModel.findById(id);
    if (!products) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Not Found Any Product" }));
      res.end();
    } else {
      const result = await productModel.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(result));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}
const ProductsController = {
  get,
  getById,
  create,
  update,
  remove,
};
module.exports = ProductsController;
