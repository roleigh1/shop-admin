const { Orders, FinishedOrders } = require("../models/models");

const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    let orders;
    let total; 
    switch (req.query.type) {
      case "new":
        orders = await Orders.findAll({
          offset,
          limit: pageSize,
        });
        total = await Orders.count(); 
        break;
      case "finished":
        orders = await FinishedOrders.findAll({
          offset,
          limit: pageSize,
        });
        total = await FinishedOrders.count(); 
        break;
      default:
        res.status(400).json({message: "no Table to select"})
    }
    res.status(200).json({ orders,total });
  } catch (error) {
    console.error("Error getting all orders", error);
    res
      .status(400)
      .json({ message: "Error sending Data", error: error.message });
  }
};
const finishOrder = async (req, res) => {
  try {
    const { rowSelectionModelOrders } = req.body;
    console.log(rowSelectionModelOrders);
    const oldOrders = await Orders.findAll({
      where: {
        id: rowSelectionModelOrders
      },
    });
    const finishedOrders = await FinishedOrders.bulkCreate(
      oldOrders.map((oldOrder) => ({
        id: oldOrder.id,
        email: oldOrder.email,
        item: oldOrder.item,
        total: oldOrder.total,
        pickupdate: oldOrder.pickupdate,
        location: oldOrder.location,
      }))
    );
    res.status(200).json({ message: "Selected Order", finishedOrders });
    const deleteFinishedOrder = await Orders.destroy({
      where: {
        id: rowSelectionModelOrders,
      },
    });
    console.log("Finished order is deleted", deleteFinishedOrder);
  } catch (error) {
    console.error("Error getting old order", error);
    res.status(400).json({ message: "Error getting old Order", error });
  }
};

module.exports = {
  getAllOrders,
  finishOrder,
};
