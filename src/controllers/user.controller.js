import fs from "fs/promises";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async(req,res)=>{
  // get user details from frontend
  // validation - not empty
  // check if user already exists - username, email
  // check for images, check for avatar
  // upload them in cloudinary - avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response

  // get user details from frontend
  const {username, email, fullName, password } = req.body
  console.log("email: ",email);
  
  // validation - not empty
  if(
    [username, email, fullName, password].some((field)=> field?.trim()==="")
  ){
    throw new ApiError(400, "All fields are required")
  }

  // check if user already exists - username, email
  const existedUser = await User.findOne({
    $or: [{email}, {username}]
  })
  if(existedUser){
    throw new ApiError(409, "User already exists")
  }

  // check for images, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImageLocalPath = req.files.coverImage[0].path
  }

  if(!avatarLocalPath){
    throw new ApiError(400, "avatar is required.. prblm in avatarLocalPath")
  }

  // upload them in cloudinary - avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new ApiError(400, "avatar is required.. cloudinary upload prblm")
  }

  // create user object - create entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  // remove password and refresh token field from response -->[.select()]
  // check for user creation -->[.findById()]
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the User")
  }
   
  // return response
  return res.status(201).json(
    new ApiResponse(200, createdUser,"User registered Successfully")
  )


})

export {registerUser}