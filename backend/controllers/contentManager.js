const {
  BannerData,
  InfoCard,
  BestSellerItemsDB,
  ProductsDB,
  FinishedOrders, 
  sequelize
} = require("../models/models");
const { Op } = require("sequelize");


const upload = require("../multer/upload");
const fs = require("fs");

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
          limit: 3,
        });
        break;
      case "bestsellers":
        response.bestseller = await BestSellerItemsDB.findAll();
        break;
      case "products":
        response.products = await ProductsDB.findAll();
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
  const whichContent = req.params.whichContent;

  try {

    if (whichContent === "inventory") {
      if (!req.files || req.files.length === 0) {
        return res.status(400).send("No files uploaded");
      }

      const {
        name,
        price,
        type,
        unity,
        where,
        description, 
      } = req.body;
      console.log("untiy" , unity)
      const uploadedImageURLs = [];

      // Alle Bilder hochladen
      for (const file of req.files) {
        const fileStream = fs.createReadStream(file.path);

        const params = {
          Bucket: "shop",
          Key: file.filename,
          Body: fileStream,
          ACL: "public-read",
        };

        const uploadResult = await s3.upload(params).promise();
        fs.unlinkSync(file.path);

        uploadedImageURLs.push(uploadResult.Location);
      }


      const firstImage = uploadedImageURLs[0];
      const secondImage = uploadedImageURLs[1];
      const thirdImage = uploadedImageURLs[2];
      const fourthImage = uploadedImageURLs[3];


      if (where === "products") {
        const ProductId = await ProductsDB.findOne({
          attributes: [[sequelize.fn("max", sequelize.col("id")), "lastId"]],
        });
        let lastId = ProductId.get("lastId") || 0;

        const Product = await ProductsDB.create({
          id: lastId + 1,
          name: name,
          unit: unity,
          price: Number(price),
          description: description,
          firstImage: firstImage,
          secondImage: secondImage,
          thirdImage: thirdImage,
          fourthImage: fourthImage,
          type: type,
        });

        console.log("Product created:", Product.id);
      } else {
        const lastBestsellerID = await BestSellerItemsDB.findOne({
          attributes: [[sequelize.fn("max", sequelize.col("id")), "lastId"]],
        });
        let lastBestseller = lastBestsellerID.get("lastId") || 0;

        const Bestseller = await BestSellerItemsDB.create({
          id: lastBestseller + 1,
          name: name,
          unit: unity,
          price: Number(price),
          description: description, 
          firstImage: firstImage,
          secondImage: secondImage,
          thirdImage: thirdImage,
          fourthImage: fourthImage,
          type: type,
        });

        console.log("Bestseller created:", Bestseller.id);
      }

      return res.json({
        message: "Inventory upload successful",
        images: uploadedImageURLs,
      });
    }

    // Banner
    if (whichContent === "banner") {
      if (!req.file) return res.status(400).send("No file uploaded");

      const fileStream = fs.createReadStream(req.file.path);
      const params = {
        Bucket: "shop",
        Key: req.file.filename,
        Body: fileStream,
        ACL: "public-read",
      };

      const uploadResult = await s3.upload(params).promise();
      fs.unlinkSync(req.file.path);

      const { headline, text, location, top } = req.body;

      await BannerData.update(
        {
          headline,
          text,
          img: uploadResult.Location,
          top,
        },
        {
          where: { location },
        }
      );

      return res.json({
        message: "Banner upload successful",
        imageUrl: uploadResult.Location,
      });
    }

    // Cards
    if (whichContent === "cards") {
      if (!req.file) return res.status(400).send("No file uploaded");

      const fileStream = fs.createReadStream(req.file.path);
      const params = {
        Bucket: "shop",
        Key: req.file.filename,
        Body: fileStream,
        ACL: "public-read",
      };

      const uploadResult = await s3.upload(params).promise();
      fs.unlinkSync(req.file.path);

      const { name, cardText, id } = req.body;

      await InfoCard.update(
        {
          name,
          text: cardText,
          image: uploadResult.Location,
        },
        {
          where: { id },
        }
      );

      return res.json({
        message: "Card upload successful",
        imageUrl: uploadResult.Location,
      });
    }

    return res.status(400).json({ message: "Invalid content type" });
  } catch (error) {
    console.error("Error handling content upload:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
const deleteStoreItemID = async (req, res) => {
  try {
    let { idForDelete, table, idForDeleteOrders, tableOrders } = req.body;
    if (table === undefined) {
      table = tableOrders;
    }
    console.log("Table recived:", table);

    switch (table) {
      case "Bestseller":
        await BestSellerItemsDB.destroy({
          where: {
            id: {
              [Op.in]: idForDelete,
            },
          },
        });
        break;
      case "Products":
        await ProductsDB.destroy({
          where: {
            id: {
              [Op.in]: idForDelete,
            },
          },
        });
        break;
      case "finished":
        await FinishedOrders.destroy({
          where: {
            id: {
              [Op.in]: idForDeleteOrders,
            },
          },
        });
        break;
      default:
        console.log("nothing deleted");
    }

    res.status(200).json({ message: "Data deleted from", table });
  } catch (error) {
    console.error("Error receiving selected ID", error);
    res.status(400).json({ message: "Error sending post request" });
  }
};
module.exports = {
  uploadData,
  getContentData,
  deleteStoreItemID 
};