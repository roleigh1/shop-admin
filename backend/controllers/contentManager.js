const { BannerData, InfoCard } = require("../models/models");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const getContentData = async (req, res) => {
  try {
    const whichContent = req.params.whichContent;
    switch (whichContent) {
      case "banners":
        const banners = await BannerData.findAll({
          order: [["id", "DESC"]],
          limit: 2,
        });
        res.status(200).json({ contentData: banners });
        break;
      case "cards":
        const cards = await InfoCard.findAll({
          order: [["id", "DESC"]],
          limit: 3,
        });
        res.status(200).json({ contentData: cards });
        break;
      default:
        res.status(400).json({ message: "Invalid content type" });
    }
  } catch (error) {
    console.error("Error getting content data", error);
    res.status(400).json({ message: "Problem getting content data", error });
  }
};

const uploadData = (req, res) => {
  const singleUpload = upload.single("picture");

  singleUpload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Upload failed", error: err.message });
    }
    try {
      const whichContent = req.params.whichContent;
      let url = "http://localhost:3131/";
      const imagePath = (url += `uploads/${req.file.filename}`);
      switch (whichContent) {
        case "banner":
          const { headline, text, location } = req.body;

          console.log("Image Path:", imagePath);
          console.log("Headline:", headline);
          console.log("Text:", text);
          console.log("Location:", location);

          await BannerData.update(
            {
              headline: headline,
              text: text,
              img: imagePath,
            },
            {
              where: {
                location: location,
              },
            }
          );
          return res.json({
            message: "Upload successful",
            imageUrl: imagePath,
          });
          break;
        case "cards":
          const { name, cardText } = req.body;
          console.log("Image Path:", imagePath);
          console.log("Name:", name);
          console.log("Text:", cardText);
          /*
          await InfoCard.update(
            {
              name: name,
              text: cardText,
              img: imagePath,
            }
          )
      */
          return res.json({
            message: "Upload successful",
            imageUrl: imagePath,
          });
          break;
        default:
          return res.status(400).json({ message: "Invalid content type" });
      }
    } catch (error) {
      console.error("Error saving image locally:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

module.exports = {
  getContentData,
  uploadData,
};
