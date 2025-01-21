const multer = require("multer");

// Sử dụng bộ nhớ trong để lưu trữ file
const storage = multer.memoryStorage();

// Cấu hình multer để kiểm tra loại và kích thước file
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Giới hạn kích thước file (10MB)
  },
  fileFilter: (req, file, cb) => {
    // Kiểm tra loại file (Chỉ cho phép file Excel)
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx file
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only Excel files are allowed."), false);
    }
    cb(null, true);
  },
});

module.exports = upload.single("file"); // Tên trường input trong form là "file"
