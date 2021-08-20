const { fromBuffer } = require("file-type");
const FileConverter = require("./file-converter");
const FileStorage = require("./file-storage");

const DeckService = (storage = FileStorage(), converter = FileConverter()) => {
  const path = "/static/";
  const deck = {
    images: [],
  };

  /**
   * @param {Buffer} file - deck file
   */
  const saveDeck = async (file) => {
    const type = await fromBuffer(file);

    if (type.ext !== "pdf") {
      throw new Error("Unsupported type " + type.ext);
    }

    // Create random id
    const deckId = Math.floor(Math.random() * 10000);

    const images = await converter.pdfToImages(file);
    const thumbnails = await Promise.all(
      images.map(converter.generateThumbnail)
    );

    let newImages = [];
    await Promise.all(
      images.map((it, index) => {
        const src = path + deckId + index;
        const thumbnailSrc = path + deckId + index + "_thumbnail";
        const thumbnail = thumbnails[index];
        newImages.push({
          src,
          thumbnailSrc,
        });
        return Promise.all([
          storage.save(src, it),
          storage.save(thumbnailSrc, thumbnail),
        ]);
      })
    );

    deck.images = newImages;

    return;
  };

  /**
   *
   */
  const getLatestDeck = async () => {
    return deck;
  };

  return { saveDeck, getLatestDeck };
};

module.exports = DeckService;
