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

module.exports = {
  getContentData,
};
