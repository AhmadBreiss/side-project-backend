import ProductModel from "../Models/productModel.js";
import fs from "fs";

// ADD a Product
function addProduct(req, res, next) {
  console.log(req.body);
  let { path } = req.image || "";
  let { name, description, price } = req.body;
  let body = {
    name: name,
    description: description,
    price: price,
    image: path,
  };
  let doc = new ProductModel(body);
  console.log(doc);
  doc
    .save()
    .then((response) => {
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      res.status(500).json({
        message: `ERROR ${err}`,
        success: false,
      });
    });
}

// Get all the data of Product
async function getProduct(req, res, next) {
  try {
    const get = await ProductModel.find({});
    res.status(200).json({ response: get });
  } catch (err) {
    res.status(400).json(err);
  }
}

// Get Product By id
async function getProductByID(req, res, next) {
  let id = req.params.id;
  try {
    const getById = await ProductModel.findById({ _id: id });
    res.status(200).json({ response: getById });
  } catch (err) {
    res.status(400).json(err);
  }
}

// Delete Product by id
async function deleteProduct(req, res, next) {
  let id = req.params.id;
  try {
    const deleteById = await ProductModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "Product delete success", response: deleteById });
  } catch (err) {
    res.status(400).json(err);
  }
}

// Update Product By id
async function updateProduct(req, res, next) {
  let { path } = req.image || "";
  let { name, description, price } = req.body;
  let body = {
    name: name,
    description: description,
    price: price,
    image: path,
  };
  let { id } = req.params;

  ProductModel.findOneAndUpdate(
    { _id: id },
    { $set: body },
    console.log(req.body)
  )
    .then((response) => {
      if (req.image) fs.unlinkSync(response.image);
      res.status(200).send({ success: true, response });
    })
    .catch((err) => {
      res.status(500).json({
        message: `ERROR ${err}`,
        success: false,
      });
    });
}
const Product = {
  addProduct,
  getProduct,
  getProductByID,
  deleteProduct,
  updateProduct,
};

export default Product;
