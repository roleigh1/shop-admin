const multer = require("multer");

const multerS3 = require("multer-s3");
const {
  ProductsDB,
  BestSellerItemsDB,
  sequelize,
} = require("../models/models");
const currency = require("currency.js");
const { S3Client} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.IDRIVE_KEY_ID,
    secretAccessKey: process.env.IDRIVE_SECRET_KEY,
  },
  endpoint: process.env.IDRIVE_ENDPOINT,
  forcePathStyle: true,
  region: "eu-central-1",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "shop",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
    acl: "public-read",
  }),
}).array("images", 4);

const uploadImage = (req, res) => {

  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err); 
      return res
        .status(400)
        .json({ message: "Upload failed", error: err.message });
    }

  
    const { type, price, name, where, text, unit } = req.body;
    if (!type || !price || !name || !where || !text || !unit) {
      return res.status(400).json({ message: "Missing required fields" });
    }




    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Map image paths from the uploaded files
    const imagePaths = req.files.map((file) => file.location);
    const formattedPrice = currency(price).value;

    console.log("Images uploaded to S3:", imagePaths);
    console.log("Product Info:", {
      type,
      name,
      where,
      text,
      unit,
      formattedPrice,
    });

    try {
      // Insert the new product or bestseller item
      await insertNewProduct(
        where,
        name,
        type,
        formattedPrice,
        imagePaths,
        text,
        unit
      );
      return res.json({ message: "Upload successful", imageUrls: imagePaths });
    } catch (error) {
      console.error("Error saving product:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};
// Insert new product or bestseller item
const insertNewProduct = async (
  where,
  name,
  type,
  formattedPrice,
  imagePaths,
  text,
  unit
) => {

  let newImagePaths = imagePaths.map((element) => 
      element.replace(process.env.IDRIVE_ENDPOINT,"https://c2i3.c17.e2-4.dev") 
    )

  const [firstImage, secondImage, thirdImage, fourthImage] = newImagePaths;
  console.log(firstImage); 
  if (where === "products") {
    const ProductId = await ProductsDB.findOne({
      attributes: [[sequelize.fn("max", sequelize.col("id")), "lastId"]],
    });
    let lastId = ProductId.get("lastId") || 0;

    const Product = await ProductsDB.create({
      id: lastId + 1,
      name: name,
      price: formattedPrice,
      description: text,
      unit: unit,
      firstImage: firstImage || null,
      secondImage: secondImage || null,
      thirdImage: thirdImage || null,
      fourthImage: fourthImage || null,
      type: type,
    });

    console.log("Product created with ID:", Product.id);
  } else if (where === "bestseller") {
    const lastBestSellerID = await BestSellerItemsDB.findOne({
      attributes: [[sequelize.fn("max", sequelize.col("id")), "lastId"]],
    });
    let lastBestsellerId = lastBestSellerID.get("lastId") || 0;

    const Bestseller = await BestSellerItemsDB.create({
      id: lastBestsellerId + 1,
      name: name,
      price: formattedPrice,
      description: text,
      unit: unit,
      firstImage: firstImage || null,
      secondImage: secondImage || null,
      thirdImage: thirdImage || null,
      fourthImage: fourthImage || null,
      type: type,
    });

    console.log("Bestseller created with ID:", Bestseller.id);
  }
};

module.exports = {
  uploadImage,
};
