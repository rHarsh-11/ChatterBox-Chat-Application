import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try{
    const {fullName, username, password, confirmPassword, gender} = req.body;

    if(!fullName || !username || !password || !confirmPassword || !gender){
      return res.status(400).json({message: "All fields are required"});
    }

    if(password !== confirmPassword){
      return res.status(400).json({message: "Password do not match"});
    }

    const user = await User.findOne({username});
    if(user){
      res.status(400).json({message: "Username already exist."});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      fullName,
      username,
      password : hashedPassword,
      profileImage : gender === "male" ? maleAvatar : femaleAvatar,
      gender
    });
    return res.status(201).json({
      message: "Account Created Successfully",
      success : true
    })

  }catch(error){
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const {username, password} = req.body;
    if(!username || !password) {
      return res.status(400).json({message: "All fields are required"})
    };
    const user = await User.findOne({username});
    if(!user){
      return res.status(400).json({
        success : false,
        message: "Incorrect username or password"
      })
    };
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
      return res.status(400).json({
        success : false,
        message: "Incorrect username or password"
      })
    };

    const tokenData = {
      userId : user._id
    }

    const token = jwt.sign(tokenData, process.env.JWT_KEY, {expiresIn:'3d'});

    return res.status(200).cookie("token", token, {maxAge:3*24*60*60*1000, httpOnly: true, sameSite : "strict"}).json({
      _id : user._id,
      username : user.username,
      fullName : user.fullName,
      profileImage : user.profileImage
    });
    
  } catch(error) {
    console.log(error);
  }
}

export const logout = (req, res) => {
  try{
    return res.status(200).cookie("token", "", {maxAge:0}).json({message: "Logged out successfully"});

  } catch(error){
    console.log(error)
  }
}

export const getOtherUsers = async (req, res) => {
  try{
    const loggedInUserId = req.id;
    const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    
    return res.status(200).json(otherUsers);

  } catch(error){
    console.log(error)
  }
}