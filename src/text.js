const fs = require('fs');
const path = require("path");
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync(path.resolve(__dirname, "../examples/text.pdf"));

pdf(dataBuffer).then((data) => {
  console.log(data.text);
});