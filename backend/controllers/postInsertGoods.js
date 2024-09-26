const multer = require("multer");
const {
  ProductsDB,
  BestSellerItemsDB,
  sequelize,
} = require("../models/models");
const currency = require("currency.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const upload = multer({
  storage: storage,
}).array("images", 4); 

const uploadImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Upload failed", error: err.message });
    }

    const { type, price, name, where ,text,unit} = req.body;

    try {

      let imagePaths = req.files.map((file) => {
        return `https://adminapi.gärtnereileitner.at/${file.path.replace(/\\/g, "/")}`;
      });

      const formattedPrice = currency(price).value;
      console.log("Images received and saved locally:", imagePaths);
      console.log("Type:", type);
      console.log("Name:", name);
      console.log("Where:", where);
      console.log("description:", text);
      console.log("Where:",unit);

      await insertNewProduct(where, name, type, formattedPrice, imagePaths,text,unit);

      return res.json({ message: "Upload successful", imageUrls: imagePaths });
    } catch (error) {
      console.error("Error saving images locally:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

const insertNewProduct = async (where, name, type, formattedPrice, imagePaths,text,unit) => {
 
  const [firstImage, secondImage, thirdImage, fourthImage] = imagePaths;

  if (where === "products") {
    const ProductId = await ProductsDB.findOne({
      attributes: [[sequelize.fn("max", sequelize.col("id")), "lastId"]],
    });
    let lastId = ProductId.get("lastId") || 0;
    console.log("Last Product ID:", lastId);

    const Product = await ProductsDB.create({
      id: lastId + 1,
      name: name,
      price: formattedPrice,
      description: text,
      unit:unit,
      firstImage: firstImage || null, 
      secondImage: secondImage || null,
      thirdImage: thirdImage || null,
      fourthImage: fourthImage || null,
      type: type,
    });

    console.log("Product generated ID:", Product.id);
  } else {
    const lastBestSellerID = await BestSellerItemsDB.findOne({
      attributes: [[sequelize.fn("max", sequelize.col("id")), "lastId"]],
    });
    let lastBestseller = lastBestSellerID.get("lastId") || 0;
    console.log("Last Bestseller ID:", lastBestseller);

    const Bestseller = await BestSellerItemsDB.create({
      id: lastBestseller + 1,
      name: name,
      price: formattedPrice,
      description: text,
      unit:unit,
      firstImage: firstImage || null, 
      secondImage: secondImage || null,
      thirdImage: thirdImage || null,
      fourthImage: fourthImage || null,
      type: type,
    });

    console.log("Bestseller generated ID:", Bestseller.id);
  }
};

module.exports = {
  uploadImage,
};