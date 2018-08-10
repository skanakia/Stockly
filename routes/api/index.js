const router= require("express").Router();
const stockRoutes=require("./stock-api-routes");
router.use(stockRoutes);
module.exports = router;