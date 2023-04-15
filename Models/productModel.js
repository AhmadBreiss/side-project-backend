import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    collection: "Product",
    timestamps: true,
  }
);

const ProductModel = model("Product", ProductSchema);

export default ProductModel;
