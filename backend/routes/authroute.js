const express = require("express");
const logintest = require("../controllers/authController");
const counterDB = require("../controllers/countOrders");
const salesReport = require("../controllers/SalesReport");
const router = express.Router();
const displayLastOrder = require("../controllers/DisplayLastOrder");
const storeInventory = require("../controllers/storeTables");
const orders = require("../controllers/orders");
const contentManager = require("../controllers/contentManager");
const upload = require("../multer/upload");

router.get("/counter", counterDB.countOperation);
router.post("/login", logintest.login);
router.post("/register", logintest.register);
router.get("/lastOrder", displayLastOrder.getlastOrder);
router.get("/totalMonths/:month", salesReport.getTotalMonth);
router.post("/deleteID", storeInventory.getDeleteID);
router.get("/orders", orders.getAllOrders);
router.post("/orders", orders.finishOrder);
router.get("/contentData/:whichContent", contentManager.getContentData);

router.post("/contentEdit/:whichContent", (req,res) => {
  const whichContent = req.params.whichContent; 
  if(whichContent === "inventory"){
    upload.array("gallery",4)(req,res,function (err){
      if(err) return res.status(400).json({error: err.message});
        contentManager.uploadData(req, res);
    })
  } else {
    upload.single("picture")(req,res, function (err){
      if(err)  return res.status(400).json({error: err.message}); 
      contentManager.uploadData(req,res); 
    })
  }
})
  

module.exports = router;
