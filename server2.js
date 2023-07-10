const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
var crypto = require('crypto');
var address = require('address');

// var whitelist = [
//   /\.maharlikasabong\.com$/,
//   /\.maharlikasabong\.live$/,
//   /\.theoplayer\.com$/,
//   /\.youtube\.com$/,
//   "http://localhost:3000",
//   "13.212.108.240:3005",
//   "localhost",
// ];

// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (whitelist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

// app.get("/*", cors(corsOptionsDelegate), function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080;

console.log(`Serving files to port ${port}`);
app.listen(port);
