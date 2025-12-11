// src/utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Accepts either:
 * - localFilePath (string): absolute or relative path to file, OR
 * - Buffer: raw file buffer
 *
 * Returns Cloudinary upload response, or throws an Error.
 */
const uploadOnCloudinary = async (input) => {
  if (!input) throw new Error("uploadOnCloudinary: input required (path or buffer)");

  try {
    if (typeof input === "string") {
      // path
      return await cloudinary.uploader.upload(input, { resource_type: "auto" });
    } else if (Buffer.isBuffer(input)) {
      // buffer -> use upload_stream
      return await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        stream.end(input);
      });
    } else {
      throw new Error("uploadOnCloudinary: unsupported input type, expected string path or Buffer");
    }
  } catch (err) {
    console.error("cloudinary upload error:", err && (err.stack || err));
    throw err; // let caller handle cleanup & response
  }
};

export { uploadOnCloudinary };
