const express = require("express");
const logintest = require("../controllers/authController");
const counterDB = require("../controllers/countOrders");
const salesReport = require("../controllers/SalesReport");
const router = express.Router();
const displayLastOrder = require("../controllers/DisplayLastOrder");
const storeInventory = require("../controllers/storeTables");
const orders = require("../controllers/orders");
const contentManager = require("../controllers/contentManager");
const upload = require("../multer/upload")


router.get("/counter", counterDB.countOperation);
router.post("/login", logintest.login);
router.post("/register",logintest.register);
router.get("/lastOrder", displayLastOrder.getlastOrder);
router.get("/totalMonths/:month", salesReport.getTotalMonth);
router.post("/deleteID", storeInventory.getDeleteID);
router.get("/inventoryTables/:tables", storeInventory.getInventoryTable);
router.get("/orders", orders.getAllOrders);
router.post("/orders", orders.finishOrder);
router.get("/contentData/:whichContent", contentManager.getContentData);
router.post(
  "/contentEdit/:whichContent",
  upload.fields([
    {
      name: "picture", maxCount: 1
    },
    {
      name:"gallery", maxCount: 4
    }
  ]),
  contentManager.uploadData
);

module.exports = router;
