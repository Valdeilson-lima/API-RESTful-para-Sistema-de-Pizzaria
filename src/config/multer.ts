import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

cloudinary.config({
  cloud_name: process.env.CLAUDINARY_NAME,
  api_key: process.env.CLAUDINARY_KEY,
  api_secret: process.env.CLAUDINARY_SECRET,
});

export default {
  upload(folder: string) {
    return {
      storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => {
          return {
            folder: folder,
            format: file.mimetype.split('/')[1], // e.g., 'jpeg', 'png'
            public_id: file.originalname.split('.')[0], // Use original filename as public_id
          };
        },
      }),
    };
  },
};
