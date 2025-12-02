const {
  BannerData,
  InfoCard,
  BestSellerItemsDB,
  ProductsDB,
  FinishedOrders,
  sequelize
} = require("../models/models");
const { Op } = require("sequelize");





const getContentData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    let response = {}
    let total = 0;
    switch (req.query.type) {
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
        response.inventory = await BestSellerItemsDB.findAll({
          offset,
          limit: pageSize
        });
        total = await BestSellerItemsDB.count();
        break;
      case "products":
        response.inventory = await ProductsDB.findAll({
          offset,
          limit: pageSize
        });
        total =  await ProductsDB.count();
        break;
      default:
       return   res.status(400).json({ message: "Invalid content type" });
    }
    res.status(200).json({ contentData: response, total });
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
      console.log("untiy", unity)
      const uploadedImageURLs = req.files.map(file => file.location);




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

    if (whichContent === "banner") {
      if (!req.file) return res.status(400).send("No file uploaded");

      const imgUrl = req.file.location;
      const { headline, text, location } = req.body;

      await BannerData.update(
        {
          headline,
          text,
          img: imgUrl,
        },
        {
          where: { location },
        }
      );

      return res.json({
        message: "Banner upload successful",
        imageUrl: imgUrl,
      });
    }

    if (whichContent === "cards") {
      if (!req.file) return res.status(400).send("No file uploaded");
      const imgUrl = req.file.location;

      const { name, cardText, id } = req.body;

      await InfoCard.update(
        {
          name,
          text: cardText,
          image: imgUrl,
        },
        {
          where: { id },
        }
      );

      return res.json({
        message: "Card upload successful",
        imageUrl: imgUrl,
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
    let { rowSelectionModel, tableCase, rowSelectionModelOrders} = req.body;
    switch (tableCase) {
      case "bestsellers":
        await BestSellerItemsDB.destroy({
          where: {
            id: {
              [Op.in]: rowSelectionModel,
            },
          },
        });
        break;
      case "products":
        await ProductsDB.destroy({
          where: {
            id: {
              [Op.in]: rowSelectionModel,
            },
          },
        });
        break;
      case "finished":
        await FinishedOrders.destroy({
          where: {
            id: {
              [Op.in]: rowSelectionModelOrders,
            },
          },
        });
        break;
      default:
        console.log("nothing deleted");
    }

    res.status(200).json({ message: "Data deleted from", tableCase });
  } catch (error) {
    console.error("Error receiving selected ID", error);
    res.status(400).json({ message: "Error sending post request", error });
  }
};
module.exports = {
  uploadData,
  getContentData,
  deleteStoreItemID
};