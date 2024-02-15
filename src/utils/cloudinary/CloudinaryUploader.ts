import { v2 as cloudinary } from 'cloudinary';
import Env from '../variable/Env';


cloudinary.config({
  cloud_name: Env.EXPRESS_CLOUDINARY_CLOUD_NAME,
  api_key: Env.EXPRESS_CLOUDINARY_API_KEY,
  api_secret: Env.EXPRESS_CLOUDINARY_API_SECRET
})

export const extractPublicIdFromImageUrl = (imageUrl: string): string => {
  const parts = imageUrl.split("/");
  const fileName = parts[parts.length - 1].split(".")[0]; // Get the file name without the extension
  const folder = parts[parts.length - 2]; // Get the folder name
  const fullPublicId = `${folder}/${fileName}`; // Combine the folder and file name to make full public ID
  console.log("Extracted publicId:", fullPublicId);
  return fullPublicId;
};

export const uploadToCloudinary = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const opt = { folder: "cloudinary-goodminton" }
      // , public_id = file.originalname.replace

      console.log(file);
      

    cloudinary.uploader.upload(file.path, opt, function (error, result) {
      if (error) {
        return reject(error)
      } else {
        return resolve(result.secure_url)
      }
    })
  })
}

export const deleteFromCloudinary = (publicId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, function (error, result) {
      if (error) {
        return reject(error)
      } else {
        return resolve(result)
      }
    })
  })
}
