const {
  ProductsDB,
  BestSellerItemsDB,

} = require("../models/models");
const { Op } = require("sequelize");
const getInventoryTable = async (req, res) => {
  try {
    const tablesParam = req.params.tables;
    let response = {};
    switch (tablesParam) {
      case "bestseller":
        response.bestseller = await BestSellerItemsDB.findAll();
        break;
      case "products":
        response.products = await ProductsDB.findAll();
        break;
      default:
        console.log("default case");
    }
    res.json(response);
  } catch (error) {
    console.error("Error getting inventory Tables", error);
    res
      .status(400)
      .json({ message: "Problem getting Inventory Tables", error });
  }
};
const deleteInventory = async (req, res) => {
  try {
    let { idForDelete, table } = req.body;

    console.log("Table recived:", table,idForDelete);

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
      default:
        console.log("nothing deleted");
    }

    res.status(200).json({ message: "Data deleted from", table });
  } catch (error) {
    console.error("Error receiving selected ID", error);
    res.status(400).json({ message: "Error sending post request" });
  }
};
const trow = async(req,res,next) => {
  const error = new Error("This is a test error");
  error.status = 500;
  next(error);
}

module.exports = {
  getInventoryTable,
  deleteInventory,
  trow
};
