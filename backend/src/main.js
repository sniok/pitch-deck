const express = require("express");
const multer = require("multer");
const cors = require("cors");

const DeckService = require("./deck-service");
const FileStorage = require("./file-storage");

const upload = multer();
const app = express();
const port = 4242;

app.use(cors());

const storage = FileStorage();
const service = DeckService(storage);

app.post("/upload", upload.single("file"), async (req, res) => {
  const pdfBuffer = req.file.buffer;

  try {
    await service.saveDeck(pdfBuffer);
    res.send({ message: "OK" });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.send({ message: error.message });
  }
});

// Return info abut current deck
app.get("/deck", async (req, res) => {
  const deck = await service.getLatestDeck();

  res.send(deck);
});

// This would be handled by a CDN
app.get("/static/:path", async (req, res) => {
  const { path } = req.params;

  const image = await storage.get("/static/" + path);

  res.contentType("image/jpeg");
  res.send(image);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
