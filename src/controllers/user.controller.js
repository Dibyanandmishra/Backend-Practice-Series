import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/users.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req, res) => {
    // get user details from frontend
    // validate -- not empty
    // check if user already exists: username, email
    // provide local path to img and avatar and check for avatar
    // upload them to cloudinary, avatar
    // create user object -- create entry in db
    // remove password and refresh token field from response
    // check for user creation 
    // return response


    // ***get user details from frontend***
    const {fullName, email, username, password}= req.body
    console.log("email: ", email);
    
    
    // ***validate -- not empty***
    // to handle single error
    // if(fullName === ""){     
    //     throw new ApiError(400, "fullName is required!")
    // }

    // to handle multiple error
    if (
        [fullName, email, username,password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required!")
    }

    // ***check if user already exists: username, email***
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists!")
    }

    // ***provide local path to img and avatar and check for avatar***
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    // ***upload them to cloudinary, avatar***
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    // ***create user object -- create entry in db***
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // ***remove password and refresh token field from response***
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // ***check for user creation***
    if(!createdUser){
        throw new ApiError(500, "Something went wrong! While creating User")
    }

    // ***return response***
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )
}) 



export {registerUser}