import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Category",
    timestamps: true,
  }
);

const CategoryModel = model("Category", CategorySchema);

export default CategoryModel;
