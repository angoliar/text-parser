const { createWorker } = require('tesseract.js');
const path = require("path");
const { fromPath } = require("pdf2pic");
const { mkdirsSync, removeSync} = require("fs-extra");

const parse = async (image) => {
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('rus');
  await worker.initialize('rus');

  const { data: { text } } = await worker.recognize(image);
  console.log(text);
  await worker.terminate();
};

const go = async () => {
  const tempDir = path.resolve(__dirname, "../temp");
  mkdirsSync(tempDir);

  const baseOptions = {
    width: 2550,
    height: 3300,
    density: 330,
    savePath: tempDir
  };

  const convert = fromPath(path.resolve(__dirname, "../examples/scan.pdf"), baseOptions);
  const images = await convert.bulk(-1);

  for(const image of images) {
    await parse(image.path)
  }
  removeSync(tempDir);
}

return go();

