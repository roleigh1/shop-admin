const express = require("express");
const logintest = require("../controllers/authController");
const counterDB = require("../controllers/countOrders");
const salesReport = require("../controllers/SalesReport");

const router = express.Router();

const insertData = require("../controllers/postInsertGoods");
const displayLastOrder = require("../controllers/DisplayLastOrder");
const storeInventory = require("../controllers/storeTables");
const orders = require("../controllers/orders");
const contentManager = require("../controllers/contentManager");

router.get("/counter", counterDB.countOperation);
router.post("/login", logintest.login);
router.get("/lastOrder", displayLastOrder.getlastOrder);
router.get("/totalMonths/:month", salesReport.getTotalMonth);
router.post("/delete/inventory", storeInventory.deleteInventory);
router.post("/delete/orders", orders.deleteOrder);
router.get("/inventoryTables/:tables", storeInventory.getInventoryTable);
router.post("/upload", insertData.uploadImage);
router.get("/orders", orders.getAllOrders);
router.post("/orders", orders.finishOrder);
router.get("/contentData/:whichContent", contentManager.getContentData);
router.post("/contentEdit/:whichContent", contentManager.uploadData);
router.get("/error-test", storeInventory.trow);
module.exports = router;
