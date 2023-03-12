import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserInfo from "../models/UserInfo.js";

/* USER SIGNUP */
export const signup = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        profilePicturePath,
        location,
        bioDescription,
      } = req.body;
  
      const salt = await bcrypt.genSalt(); // creates random salt using bcrypt and used to create password hash
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new UserInfo({
        firstName,
        lastName,
        email,
        password: passwordHash,
        profilePicturePath,
        location,
        bioDescription,
      });

      const savedNewUser = await newUser.save();
      res.status(201).json(savedNewUser);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  /* LOGIN */
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserInfo.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };