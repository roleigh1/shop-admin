const { info } = require("console");
const { BannerData, InfoCard, sequelize } = require("../models/models");

const getContentData = async (req, res) => {
  try {
    const whichContent = req.params.whichContent;
    switch (whichContent) {
      case "banners":
        const banner= await BannerData.findAll({
          banners: [["id", "DESC"]],
          limit: 2,
        });

        res.status(200).json({ contentData: banner });
        break;
      case "infocards":
        const infoCards = await InfoCard.findAll({
          infos: [["id", "DESC"]],
          limit: 3,
        });
        res.status(200).json({ contentData:  infoCards});
        break;
      default:
        console.log("default case");
    }
  } catch (error) {
    console.error("Error getting Banner data", error);
    res.status(400).json({ message: "Problem getting Content data", message });
  }
};
const postContentEdit = async (req, res) => {
  try {
    const data = req.body;
    console.log("Received data:", data);

    if (!data.headline || !data.text || !data.location) {
      throw new Error("Missing required fields in request body");
    }

    const [numAffectedRows, affectedRows] = await BannerData.update(
      {
        headline: data.headline,
        text: data.text,
        img: "https://masterapi.gärtnereileitner.at/uploads/products_bg.jpg",
      },
      {
        where: {
          location: data.location,
        },
      }
    );

    console.log(numAffectedRows, "banner(s) updated:", affectedRows);

    res.status(200).json({ message: `${numAffectedRows} banner(s) updated` });
  } catch (error) {
    console.log("Error editing contentData", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getContentData,
  postContentEdit
};