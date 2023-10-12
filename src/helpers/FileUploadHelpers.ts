import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import multer from 'multer';
cloudinary.config({
  cloud_name: 'dnaeivkhy',
  api_key: '222275282428825',
  api_secret: 'LnGVaDixhbVf-nECs83ZhWStxTI',
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadCloudinary = async (file:any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { public_id: file.originalname },
      (error, result) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const FileUploadHelper = {
  uploadCloudinary,
  upload,
};
