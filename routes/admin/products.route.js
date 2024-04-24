const express = require("express")
const multer = require("multer")
const router = express.Router()
const storagemulter = require("../../helpers/storagemulter.js")
const upload = multer({ storage: storagemulter() })


const controller = require("../../controllers/admin/products.controller.js")
const validate = require("../../validates/admin/product.validate.js")
router.get("/", controller.index)
router.patch("/change-status/:status/:id", controller.changestatus)
router.patch("/change-multi", controller.changemulti)
router.delete("/delete/:id", controller.deleteitem)
router.get("/create", controller.create)
router.post("/create", upload.single("thumbnail"), validate.createpost, controller.createpost)
router.get("/edit/:id", controller.edit)
router.patch("/edit/:id", upload.single("thumbnail"), validate.createpost, controller.editpatch)
router.get("/detail/:id", controller.detail )
 
module.exports = router