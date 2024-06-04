const {
  ProductsDB,
  BestSellerItemsDB,
  FinishedOrders,
} = require("../models/models");
const { Op } = require("sequelize");
const getInventoryTable = async (req, res) => {
  try {
    const tablesParam = req.params.tables;
    switch (tablesParam) {
      case "bestseller":
        const bestseller = await BestSellerItemsDB.findAll();
        res.json({ bestseller });
        break;
      case "products":
        const products = await ProductsDB.findAll();
        res.json({ products });
        break;
      default:
        console.log("default case");
    }
  } catch (error) {
    console.error("Error getting inventory Tables", error);
    res
      .status(400)
      .json({ message: "Problem getting Inventory Tables", message });
  }
};
const getDeleteID = async (req, res) => {
  try {
    let { idForDelete, table, idForDeleteOrders, tableOrders } = req.body;
    if (table === undefined) {
      table = tableOrders;
    }
    console.log("Table recived:", table);

    switch (table) {
      case "Bestseller":
        const DeleteFromBestseller = await BestSellerItemsDB.destroy({
          where: {
            id: {
              [Op.in]: idForDelete,
            },
          },
        });
        break;
      case "Products":
        const DeleteFromProducts = await ProductsDB.destroy({
          where: {
            id: {
              [Op.in]: idForDelete,
            },
          },
        });
        break;
      case "finished":
        const DeleteFromFinishedProducts = await FinishedOrders.destroy({
          where: {
            id: {
              [Op.in]: idForDeleteOrders,
            },
          },
        });
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
  getInventoryTable,
  getDeleteID,
};
