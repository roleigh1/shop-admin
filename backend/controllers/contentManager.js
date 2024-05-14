const { BannerData } = require("../models/models");
const multer = require("multer");

// Multer-Konfiguration für das Speichern von Dateien
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Funktion zur Abfrage von Inhaltsdaten
const getContentData = async (req, res) => {
  try {
    const whichContent = req.params.whichContent;
    switch (whichContent) {
      case "banners":
        const banners = await BannerData.findAll({ order: [["id", "DESC"]], limit: 2 });
        res.status(200).json({ contentData: banners });
        break;
      default:
        res.status(400).json({ message: "Invalid content type" });
    }
  } catch (error) {
    console.error("Error getting content data", error);
    res.status(400).json({ message: "Problem getting content data", error });
  }
};

// Funktion zum Hochladen von Daten
const uploadData = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Upload failed', error: err.message });
    }

    const { headline, text, location } = req.body;

    try {
      const imagePath = `uploads/${req.file.filename}`;
      await BannerData.create({
        headline: headline,
        text: text,
        img: imagePath,
        location: location
      });

      return res.json({ message: 'Upload successful', imageUrl: imagePath });
    } catch (error) {
      console.error('Error saving image locally:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};

module.exports = {
  getContentData,
  uploadData
};
