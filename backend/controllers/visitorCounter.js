const { Visitors } = require("../models/models");

const countVisitors = async (req, res) => {
  try {
    console.log("test");
    const countVisitors = await Visitors.increment("counter", {
      by: 1,
      where: { id: 1 },
    });
  } catch (error) {
    console.error("Error counting visitors,", error);
  }
};
const counterVisitors = async (req, res) => {
  try {
    const visitors = await Visitors.findOne({
      where: { id: 1 },
    });

    res.status(200).json({ counter: visitors.counter }); 
  } catch (error) {
    console.log("Error getting visitors counter", error);
  }
};

module.exports = {
  countVisitors,
  counterVisitors,
};
