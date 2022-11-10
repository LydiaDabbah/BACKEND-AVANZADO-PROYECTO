import multer from 'multer'
import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const config=cloudinary.v2.config(
    {
      cloud_name:"dphnkjygf",
      api_key:942244552987817,
      api_secret:"rA9AF7qeidblHZoGHqvC5pQXLKE"
    }
  )

const storage = new CloudinaryStorage({
  cloudinary: config,// la variable de arriba
  params: {
    folder: "DEV",
  },
});

const uploadMiddleware = multer({ storage: storage });

export {uploadMiddleware}