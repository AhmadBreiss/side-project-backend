import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

//   ADD a User
async function addUser(req, res) {
  try {
    const { full_name, phone_number, email, password, role } = req.body;
    if (!full_name || !phone_number || !email || !password || !role) {
      return res.status(400).send("all input is required");
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("user already exist. please login again");
    }
    const encryptedUserPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      full_name,
      phone_number,
      email: email.toLowerCase(),
      password: encryptedUserPassword,
      role,
    });

    const token = jwt.sign(
      { user_id: user._id, email, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    res.cookie("access-token", token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
    });
    user.token = token;
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
}
// function addUser(req, res, next) {
//   try {
//     let data = req.body;
//     let UserData = new userModel(data);
//     UserData.save();
//     res.status(200).json({ response: UserData });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ err });
//   }
// }

// Get all the data of User
async function getUser(req, res, next) {
  try {
    const get = await userModel.find({});
    res.status(200).json({ response: get });
  } catch (err) {
    res.status(400).json(err);
  }
}

// Get User By id
async function getUserByID(req, res, next) {
  let id = req.params.id;
  try {
    const getById = await userModel.findById({ _id: id });
    res.status(200).json({ response: getById });
  } catch (err) {
    res.status(400).json(err);
  }
}

// Delete User by id
async function deleteUser(req, res, next) {
  let id = req.params.id;
  try {
    const deleteById = await userModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "User delete success", response: deleteById });
  } catch (err) {
    return res.status(400).json(err);
  }
}

// Update User By id
async function updateUser(req, res, next) {
  let id = req.params.id;
  let data = req.body;
  try {
    let response = await userModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    res.status(200).json({ message: "Update success", response });
  } catch (err) {
    res.status(400).json(err);
  }
}

// login for user

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "incorrect email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "incorrect email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    res.cookie("access-token", token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).send({
      message: "authentication sucss",
      token: token,
      user: {
        _id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
}
// logout for admin
async function logOutUser(req, res, next) {
  try {
    res.clearCookie("access-token");
    return res.status(200).send("logged out success");
  } catch (err) {
    return next(err);
  }
}

const User = {
  addUser,
  getUser,
  getUserByID,
  deleteUser,
  updateUser,
  loginUser,
  logOutUser,
};

export default User;
