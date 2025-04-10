const multer  = require('multer');

const storage = multer.memoryStorage(); // ✅ Correct spelling
const upload = multer({ storage });

module.exports = upload;
