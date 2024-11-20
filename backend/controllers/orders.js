const { Orders, FinishedOrders } = require("../models/models");

const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    let orders, totalOrders;
    switch (req.query.type) {
      case "new":
        totalOrders = await Orders.count();
        orders = await Orders.findAll({
          offset,
          limit: pageSize,
        });
        break;
      case "finished":
        totalOrders = await FinishedOrders.count();
        orders = await FinishedOrders.findAll({
          offset,
          limit: pageSize,
        });
        break;
      default:
        totalOrders = await Orders.count();
        orders = await Orders.findAll({
          offset,
          limit: pageSize,
        });
    }
    console.log(req.query.type);
    console.log(orders);
    res.status(200).json({
      total: totalOrders,
      page,
      pageSize,
      orders,
    });
  } catch (error) {
    console.error("Error getting all orders", error);
    res
      .status(400)
      .json({ message: "Error sending Data", error: error.message });
  }
};
const finishOrder = async (req, res) => {
  try {
    const { finishOrderId } = req.body;
    console.log(finishOrderId);
    const oldOrders = await Orders.findAll({
      where: {
        id: finishOrderId,
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
    const deleteFinishedOrder = await Orders.destroy({
      where: {
        id: finishOrderId,
      },
    });
    res
      .status(200)
      .json({ message: "Selected Order", finishedOrders, deleteFinishedOrder });
  } catch (error) {
    console.error("Error getting old order", error);
    res.status(400).json({ message: "Error getting old Order", error });
  }
};
const deleteOrder = async (req, res) => {
  try {
    let { idForDelete } = req.body;
    console.log(" id for Delete ", idForDelete);
    const deleteFinishedOrder = await FinishedOrders.destroy({
      where: {
        id: idForDelete,
      },
    });
    res.status(200).json({ message: "Order is deleted", deleteFinishedOrder });
  } catch (error) {
    res.status(400).json({ message: "id not Found", error });
  }
};
const searchOrder = async (req, res) => {
  try {
    let { searchID, tableOrders } = req.body;
    console.log(searchID,tableOrders)
    let foundOrder;
    if (tableOrders === "new") {
      foundOrder = await Orders.findOne({
        where: {
          id: searchID,
        },
      });
    } else {
      foundOrder = await FinishedOrders.findOne({
        where: {
          id: searchID,
        },
      });
    }
    res.status(200).json({ message: "Order found", foundOrder });
  } catch (error) {
    res.status(400).json({ message: "Order not found", error });
  }
};

module.exports = {
  getAllOrders,
  finishOrder,
  deleteOrder,
  searchOrder,
};
