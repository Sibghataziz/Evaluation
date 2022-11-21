import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../Database/user.model.js";
import dotenv from 'dotenv'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
    console.log(JWT_SECRET)
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    JWT_SECRET
  );
}

async function login(req, res) {
  const user = req.body;

  let { email, password } = user;

  let existingUser = await userModel.findOne({
    email,
  });

  if (existingUser) {
    let match = bcrypt.compareSync(password, existingUser.password);

    if (match) {
      let token = generateToken(existingUser);

      return res.status(200).send({
        status: "success",
        token
      });
    } else {
      return res.status(400).send({
        status: "error",
        message: "Invalid Password",
      });
    }
  } else {
    return res.status(400).send({
      status: "error",
      message: "Invalid Email",
    });
  }
}

async function getLoggedInUser(req, res) {
  const { user } = req;

  if (user) {
    return res.status(200).send({
      status: "success",
      data: user,
    });
  } else {
    return res.status(400).send({
      status: "error",
      message: "User is not Logged In",
    });
  }
}

async function register(req, res) {
  const user = req.body;

  let { name, email, password } = user;

  let existingUser = await userModel.findOne({
    email,
  });

  if (existingUser) {
    return res.status(400).send({
      status: "error",
      message: "User already exists with the given email",
    });
  } else {
    password = bcrypt.hashSync(password);
    const check= email.split('@')
    const isAdmin = check[1]==='masaischool.com' 
    let user = await userModel.create({
      name,
      email,
      password,
      isAdmin
    });

    user = user.toJSON();

    delete user.password;

    return res.status(200).send({
      status: "success",
      data: user,
    });
  }
}



export {
  register,
  login,
  getLoggedInUser
};
