const fs = require('fs');
const key = fs.readFileSync('./firebase-adminsdk-fbsvc.json', 'utf8');
const base64 = Buffer.from(key).toString('base64')
console.log(base64);


// const fs = require("fs");

// try {
//   const raw = fs.readFileSync("./firebase-adminsdk-fbsvc.json", "utf8");
//   const parsed = JSON.parse(raw);
//   console.log("✅ File is valid:", parsed.client_email);
// } catch (err) {
//   console.error("❌ JSON parse failed:", err.message);
// }