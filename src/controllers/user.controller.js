import fs from "fs/promises";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Debug logs — enable while testing if needed:
  console.log("==== UPLOAD DEBUG ====");
  console.log("content-type:", req.headers["content-type"]);
  console.log("body:", req.body);
  console.log("req.file:", req.file);
  console.log("req.files:", req.files);

  // Defensive: if req.body is undefined, replace with empty object so destructure won't throw
  const safeBody = req.body || {};
  const { fullName, email, username, password } = safeBody;

  // Basic validation
  if ([fullName, email, username, password].some((f) => f == null || f?.toString().trim() === "")) {
    throw new ApiError(400, "All fields (fullName, email, username, password) are required and must be non-empty.");
  }

  // Check if user exists
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists!");
  }

  // Detect uploaded avatar/cover paths (supports single/fields/array)
  const avatarLocalPath =
    req.file?.path || // upload.single('avatar')
    req.files?.avatar?.[0]?.path || // upload.fields(...) or upload.array('avatar')
    req.files?.file?.[0]?.path || // sometimes client uses 'file'
    undefined;

  const coverImageLocalPath =
    req.files?.coverImage?.[0]?.path ||
    req.files?.coverImage?.path || // defensive
    undefined;

  if (!avatarLocalPath) {
    // If you hit this, either Postman didn't send the file or multer didn't run for this route
    throw new ApiError(400, "Avatar file is required. Ensure your request is multipart/form-data and includes a file field named 'avatar'.");
  }

  // Upload to Cloudinary
  let avatarUploadResult = null;
  let coverUploadResult = null;

  try {
    avatarUploadResult = await uploadOnCloudinary(avatarLocalPath);
    if (coverImageLocalPath) {
      coverUploadResult = await uploadOnCloudinary(coverImageLocalPath);
    }
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    throw new ApiError(500, "Failed to upload images");
  } finally {
    // cleanup temp files (best-effort)
    const cleanup = async (path) => {
      if (!path) return;
      try {
        await fs.unlink(path);
      } catch (e) {
        console.warn("Failed to delete temp file:", path, e?.message || e);
      }
    };
    await Promise.all([cleanup(avatarLocalPath), cleanup(coverImageLocalPath)]);
  }

  if (!avatarUploadResult || !avatarUploadResult.url) {
    throw new ApiError(500, "Avatar upload failed");
  }

  // Create user
  const user = await User.create({
    fullName,
    avatar: avatarUploadResult.url,
    coverImage: coverUploadResult?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // Fix typo: _id (not _1d)
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating the user");
  }

  return res.status(201).json(new ApiResponse(201, createdUser, "User registered Successfully"));
});

export { registerUser };
