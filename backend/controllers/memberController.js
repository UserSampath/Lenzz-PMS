const User = require("../models/memberModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const keysecret = process.env.SECRET;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lenzzhasthiyit@gmail.com",
    pass: "mfmpeqgzbjbxkcja",
  },
});
// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, selectedJob: user.selectedJob });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { firstname, lastname, email, password, selectedJob } = req.body;

  try {
    const user = await User.signup(
      firstname,
      lastname,
      email,
      password,
      selectedJob
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, selectedJob: user.selectedJob });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
/*
const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.forget(email);

    oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const secret = process.env.SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
      expiresIn: "1d",
    });

    const link = `http://localhost:4000/api/user/resetPassword/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lenzzhasthiyit@gmail.com",
        pass: "mfmpeqgzbjbxkcja",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "ishaninfo56@gmail.com",
      subject: "password reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const Olduser = await User.findOne({ _id: id });
  if (!Olduser) {
    return res.json({ status: "User Not Exists" });
  }
  const secret = process.env.SECRET + Olduser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: " verified" });
  } catch (error) {
    console.log(error);
    res.send("not verified");
  }
};

const ResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  console.log(req.params);
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.json({ status: "User Not Exists" });
  }
  const secret = process.env.SECRET + user.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
};
*/
const passwordlink = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter your Email" });
  }

  try {
    const user = await User.forget(email);
    const userfind = await User.findOne({ email: email });
    const token = jwt.sign({ _id: userfind._id }, keysecret, {
      expiresIn: "1d",
    });
    const setusertoken = await User.findByIdAndUpdate(
      { _id: userfind._id },
      { verifytoken: token },
      { new: true }
    );
    if (setusertoken) {
      const mailOptions = {
        from: "lenzzhasthiyit@gmail.com",
        to: email,
        subject: "sending Email for password Reset",
        text: `this link is valid for 2 minutes http://localhost:3000/forgotPassword/${userfind.id}/${setusertoken.verifytoken}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(201).json({ status: 201, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "email sent succsfully" });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
    res.status(400).json({ error: error.message });
  }
};

const forgotpassword = async (req, res) => {
  const { id, token } = req.params;
  try {
    const validuser = await User.findOne({ _id: id, verifytoken: token });
    const verifyToken = jwt.verify(token, keysecret);
    console.log(verifyToken);
    if (validuser && verifyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exits" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

const reset = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const validuser = await User.findOne({ id: id, verifytoken: token });
    const verifyToken = jwt.verify(token, keysecret);

    if (validuser && verifyToken._id) {
      const newpassword = await bcrypt.hash(password, 12);

      const setnewuserpass = await User.findByIdAndUpdate(
        { _id: id },
        { password: newpassword }
      );
      setnewuserpass.save();
      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "user not exits" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};
module.exports = {
  passwordlink,
  signupUser,
  loginUser,
  forgotpassword,
  reset,
};
