const { Op } = require("sequelize");
const { FinishedOrders } = require("../models/models");
const moment = require("moment");

function getLastMonday() {
  let today = moment();
  let dayOfWeek = today.day();

  let distanceToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  let lastmonday = today.subtract(distanceToLastMonday, "days");
  console.log("Last Monday Date: ", lastmonday.format("YYYY-MM-DD"));
  return lastmonday.format("YYYY-MM-DD");
}

const countOperation = async (req, res) => {
  try {
    let lastMonday = getLastMonday();
   
    const ordersCountLastMonday = await FinishedOrders.count({
      where: {
        createdAt: {
          [Op.gte]: lastMonday, 
        },
      },
    });
    const countOrder = await FinishedOrders.count();
    console.log("Orders Counted up to Last Monday: ", ordersCountLastMonday);
    const counterOp = { 
      ordersCountLastMonday,
      countOrder,
      lastMonday, 
    };
    res.json({ counterOp });
  } catch (error) {
    console.error("Error Counting ", error);
    res.status(400).json({ "Error counting orders": error });
  }
};

module.exports = { countOperation };
