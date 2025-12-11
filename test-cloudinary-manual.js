import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

(async () => {
  try {
    const absolute = path.resolve("public/temp/example.jpg"); // put a real file here
    console.log("Uploading:", absolute);
    const res = await cloudinary.uploader.upload(absolute, { resource_type: "auto" });
    console.log("UPLOAD OK:", res && res.url);
  } catch (err) {
    console.error("UPLOAD FAILED:");
    console.error(err && (err.stack || err));
    if (err && err.http_code) console.error("http_code:", err.http_code);
    if (err && err.error) console.error("error:", err.error);
  }
})();
