const express = require("express");
const logintest = require("../controllers/authController");
const counterDB = require("../controllers/countOrders");
const salesReport = require("../controllers/SalesReport");
const router = express.Router();
const displayLastOrder = require("../controllers/DisplayLastOrder");
const orders = require("../controllers/orders");
const contentManager = require("../controllers/contentManager");
const upload = require("../multer/upload");
const { authenticateJWT, logRequest } = require("../middleware/auth");


router.use(logRequest);

router.get("/counter", authenticateJWT.counterDB.countOperation);
router.post("/login", logintest.login);
router.get("/lastOrder", authenticateJWT.displayLastOrder.getlastOrder);
router.get("/totalMonths/:month", authenticateJWT.salesReport.getTotalMonth);
router.post("/deleteID", authenticateJWT.contentManager.deleteStoreItemID);
router.get("/orders", authenticateJWT.orders.getAllOrders);
router.post("/orders", authenticateJWT.orders.finishOrder);
router.get("/contentData/:whichContent", authenticateJWT.contentManager.getContentData);

router.post("/contentEdit/:whichContent", authenticateJWT, (req, res) => {
  const whichContent = req.params.whichContent;
  if (whichContent === "inventory") {
    upload.array("gallery", 4)(req, res, function (err) {
      if (err) return res.status(400).json({ error: err.message });
      contentManager.uploadData(req, res);
    })
  } else {
    upload.single("picture")(req, res, function (err) {
      if (err) return res.status(400).json({ error: err.message });
      contentManager.uploadData(req, res);
    })
  }
})

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
