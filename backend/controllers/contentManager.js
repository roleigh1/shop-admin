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
    let response = {};
    switch (whichContent) {
      case "banners":
        response.banners = await BannerData.findAll({
          order: [["id", "DESC"]],
          limit: 2,
        });
        break;
      case "cards":
        response.cards = await InfoCard.findAll({
          order: [["id", "DESC"]],
          limit: 3,
        });
        break;
      default:
        res.status(400).json({ message: "Invalid content type" });
    }
    res.status(200).json({ contentData: response });
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
      let url = "https://adminapi.gärtnereileitner.at/";
      const imagePath = (url += `uploads/${req.file.filename}`);
      const { headline, text, location} = req.body;
      const { name, cardText, id } = req.body;
      switch (whichContent) {
        case "banner":
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

        case "cards":
          console.log("id", id);
          console.log("Image Path:", imagePath);
          console.log("Name:", name);
          console.log("Text:", cardText);

          await InfoCard.update(
            {
              name: name,
              text: cardText,
              image: imagePath,
            },
            {
              where: {
                id: id,
              },
            }
          );

          return res.json({
            message: "Upload successful",
            imageUrl: imagePath,
          });

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
