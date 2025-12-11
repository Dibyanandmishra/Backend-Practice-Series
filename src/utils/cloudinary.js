// src/utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a local file path to Cloudinary.
 * Returns the upload response (or throws an Error with stack).
 */
const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) throw new Error("uploadOnCloudinary: localFilePath is required");

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file is uploaded on cloudinary", response.url);
    return response;
  } catch (err) {
    // Log full error for debugging and rethrow
    console.error("cloudinary.uploader.upload failed for:", localFilePath);
    console.error(err && (err.stack || err));
    throw err; // let caller handle cleanup / response
  }
};

export { uploadOnCloudinary };
