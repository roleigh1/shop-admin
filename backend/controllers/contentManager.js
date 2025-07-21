const {
  BannerData,
  InfoCard,
  BestSellerItemsDB,
  ProductsDB,
  sequelize,
} = require("../models/models");
const upload = require("../multer/upload");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");

const s3 = new AWS.S3();
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

const uploadData = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const fileStream = fs.createReadStream(req.file.path);

  const params = {
    Bucket: "shop",
    Key: req.file.filename,
    Body: fileStream,
    ACL: "public-read",
  };

  s3.upload(params, async (err, data) => {
    fs.unlinkSync(req.file.path);

    if (err) {
      console.error("Error uploading to S3", err);
      return res.status(500).send("Error uploading file to bucket");
    }

    try {
      const whichContent = req.params.whichContent;

      const imagePath = data.Location;
      const {
        headline,
        text,
        location,
        top,
        name,
        cardText,
        id,
        where,
        type,
        price,
      } = req.body;

      switch (whichContent) {
        case "banner":
          await BannerData.update(
            {
              headline,
              text,
              img: imagePath,
              top,
            },
            {
              where: { location },
            }
          );
          return res.json({
            message: "Banner upload successful",
            imageUrl: imagePath,
          });

        case "cards":
          await InfoCard.update(
            {
              name,
              text: cardText,
              image: imagePath,
            },
            {
              where: { id },
            }
          );
          return res.json({
            message: "Card upload successful",
            imageUrl: imagePath,
          });
        case "inventory":
          console.log(name,price,type)
          if (where === "products") {
            
            const ProductId = await ProductsDB.findOne({
              attributes: [
                [sequelize.fn("max", sequelize.col("id")), "lastId"],
              ],
            });
            let lastId = ProductId.get("lastId") || 0;
            console.log("last Product ID", lastId);
            const Product = await ProductsDB.create({
              id: lastId + 1,
              name: name,
              price: Number(price),
              image: imagePath,
              type: type,
            });
            console.log("Product generated ID:", Product.id);
          } else {
            const lastBestsellerID = await BestSellerItemsDB.findOne({
              attributes: [
                [sequelize.fn("max", sequelize.col("id")), "lastId"],
              ],
            });
            let lastBestseller = lastBestsellerID.get("lastId") || 0;
            console.log("Last Bestseller ID:", lastBestseller);

            const Bestseller = await BestSellerItemsDB.create({
              id: lastBestseller + 1,
              name: name,
              price: Number(price),
              image: imagePath,
              type: type,
            });
            console.log("Bestseller generated ID:", Bestseller.id);
          }
          return res.json({
            message: "Inventory upload successful",
            imageUrl: imagePath,
          });
        default:
          return res.status(400).json({ message: "Invalid content type" });
      }
    } catch (error) {
      console.error("Error updating database:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

module.exports = {
  getContentData,
  uploadData,
};
