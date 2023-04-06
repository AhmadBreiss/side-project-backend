import mongoose from "mongoose";
import { model } from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category :{
        type: String,
        required: true,
    },
    description :{
        type: String,
        required: true,
    },
    price :{
        type: Number,
        required: true,
    },
    ImageIcon:{
      type: String
    },
  },
  {
    collection: 'Product',
    timestamps: true
    
  },
)

const ProductModel = model("services", ProductSchema);

export default ProductModel;
