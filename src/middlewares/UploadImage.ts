import * as multer from 'multer'
import * as path from 'path'


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/assets/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension)
  },
})

const uploadImage = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/webp'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg, .webp and .jpeg format allowed!'))
    }
  },
})
// .array('product_image', 3)

export default uploadImage

// // src/middlewares/multerMiddleware.js
// const multer = require('multer');
// const path = require('path');

// // Konfigurasi penyimpanan untuk Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images'); // Lokasi penyimpanan gambar
//   },
//   filename: function (req, file, cb) {
//     // Penamaan file: timestamp + nama asli file
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const fileExtension = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
//   },
// });

// // Filter untuk jenis file yang diterima
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Hanya gambar yang diperbolehkan!'), false);
//   }
// };

// // Inisialisasi Multer dengan konfigurasi
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // Batas ukuran file (dalam byte) - contoh 5 MB
//   },
// });

// // Middleware untuk menangani proses upload menggunakan Multer
// const uploadMiddleware = upload.single('image'); // 'image' adalah nama field di form HTML

// module.exports = uploadMiddleware;
