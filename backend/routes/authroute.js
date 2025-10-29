const express = require("express");

const counterDB = require("../controllers/countOrders");
const salesReport = require("../controllers/SalesReport");
const router = express.Router();
const displayLastOrder = require("../controllers/DisplayLastOrder");
const orders = require("../controllers/orders");
const contentManager = require("../controllers/contentManager");
const upload = require("../multer/upload");
const authController = require("../controllers/authController")

const requireAuth = authController.authToken;

router.post("/logout", authController.logOut); 
router.get("/counter", requireAuth, counterDB.countOperation);
router.post("/login", express.json() , authController.login);
router.get("/protected", requireAuth, authController.getProtectedData); 
router.post("refesh", authController.refeshEndpoint)   ; 
router.get("/lastOrder", requireAuth, displayLastOrder.getlastOrder);
router.get("/totalMonths/:month", requireAuth, salesReport.getTotalMonth);
router.post("/deleteID", express.json(), requireAuth, contentManager.deleteStoreItemID);
router.get("/orders",  orders.getAllOrders);
router.post("/orders", express.json(), requireAuth, orders.finishOrder);
router.get("/contentData/:whichContent", requireAuth, contentManager.getContentData);

router.post("/contentEdit/:whichContent", requireAuth, (req, res) => {
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
});
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
