const products = require("../../models/product.model")

module.exports.index = async (req, res) => {
    const product = await products.find({
        status: "active"
    }).sort({ rank: "asc"})
    
    res.render("client/pages/products/index", {
        pagetitle: "trang danh sach san pham",
        product: product
    })
        
    
}
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false, 
            slug: req.params.slug,
            status: "active"
        }
        const product = await products.findOne(find)
        res.render("client/pages/products/detail", {
            pagetitle: product.title,
            product: product
        })
    
    } catch (error) {
        // req.flash("erorr", "loi")
        // res.redirect(`/products`)
        res.send("ok")
    }

}
   