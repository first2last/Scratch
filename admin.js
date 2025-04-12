// // createAdmin.js
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const User = require("./models/user-model"); // adjust path if needed

// async function createAdmin() {
//     await mongoose.connect("mongodb://localhost:27017/Scratch");

//     const existingAdmin = await User.findOne({ email: "admin@example.com" });
//     if (existingAdmin) {
//         console.log("❌ Admin already exists");
//         return mongoose.disconnect();
//     }

//     const hashedPassword = await bcrypt.hash("adminpassword123", 12);
//     const adminUser = new User({
//         fullname: "Admin",
//         email: "admin@example.com",
//         password: hashedPassword,
//         role: "admin"
//     });

//     await adminUser.save();
//     console.log("✅ Admin user created");

//     mongoose.disconnect();
// }

// createAdmin().catch(err => {
//     console.error(err);
//     mongoose.disconnect();
// });
