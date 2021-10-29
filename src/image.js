const { createWorker } = require('tesseract.js');
const path = require("path");

const worker = createWorker();

(async () => {
  await worker.load();
  await worker.loadLanguage('rus');
  await worker.initialize('rus');
  const image = path.resolve(__dirname, ('../examples/image.png'));
  const { data: { text } } = await worker.recognize(image);
  console.log(text);
  await worker.terminate();
})();