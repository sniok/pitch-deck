const gm = require("gm");

const defaultConfig = {
  density: 150,
  format: "png",
  quality: 80,
  thumbnailWidth: 720,
  width: 1600,
};

const FileConverter = (config = defaultConfig) => {
  const convert = gm.subClass({ imageMagick: true });

  const getPageCount = (imageState) =>
    new Promise((res, reject) =>
      imageState.identify("%p ", (err, info) => {
        if (err) return reject(err);
        res(info.split(" ").map((pageNumber) => parseInt(pageNumber, 10)));
      })
    );

  const renderPage = (imageState, page) =>
    new Promise((res) =>
      imageState
        .selectFrame(page)
        .resize(config.width)
        .density(config.density, config.density)
        .quality(config.quality)
        .flatten()
        .compress("JPEG")
        .toBuffer(config.format, (err, buffer) => {
          res(buffer);
        })
    );

  /**
   * Renders pdf to an image
   *
   * @param {Buffer} pdf file
   * @param {number} width optional width to resize
   * @returns {Promise<Buffer[]>} jpeg images
   */
  const pdfToImages = async (pdfBuffer, width) => {
    console.debug(`Accepted pdf buffer of size ${pdfBuffer.byteLength}`);

    const imageState = convert(pdfBuffer);

    const pages = await getPageCount(imageState);

    let images = [];

    for (const page of pages) {
      images.push(await renderPage(imageState, page));
    }

    return images;
  };

  const generateThumbnail = async (buffer) =>
    new Promise((res) => {
      convert(buffer)
        .resize(config.thumbnailWidth, undefined, ">")
        .compress("JPEG")
        .toBuffer(config.format, (err, buffer) => {
          res(buffer);
        });
    });

  return { pdfToImages, generateThumbnail };
};

module.exports = FileConverter;
