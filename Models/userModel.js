import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      // validate: [validateEmail, "Please fill a valid email address"],
      match:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

const userModel = model("User", userSchema);

export default userModel;
