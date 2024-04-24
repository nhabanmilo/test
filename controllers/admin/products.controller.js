const products = require("../../models/product.model")
const systemconfig = require("../../config/system")
const filterstatushelper = require("../../helpers/filterStatus");
const searchelper = require("../../helpers/search");
const paginationhelper = require("../../helpers/pagination")

//[GET /admin/products]

module.exports.index = async (req, res) => {

    const filterstatus = filterstatushelper(req.query);
  
   
   // console.log(req.query.status);

    let find = {
        deleted:false,
        
    };
    if(req.query.status) {
        find.status = req.query.status
    }

    const objectseach = searchelper(req.query);
 
    if(objectseach.regex){
        find.title = objectseach.regex
    }
    //pagination

    // const counttt = await products.count(find)
    let objectpagination = paginationhelper(
        {
            currenpage: 1,
            limititem: 4

        },
        req.query//countt     
        
    )

    const product = await products.find(find)
    .sort({ rank: "asc"})
    .limit(objectpagination.limititem)
    .skip(objectpagination.skip)
   
    res.render("admin/pages/products/index", {
        pagetitle: "danh sach san pham",
        product: product,
        filterstatus: filterstatus,
        keyword: objectseach.keyword,
        pagination: objectpagination
        
    })
}
//[get] /admin/products/change-status/id
module.exports.changestatus = async (req,res) => {

    
    const status = req.params.status;
    const id = req.params.id 

    await products.updateOne({_id: id}, {status: status})

    req.flash("success", "cap nhat trang thai thanh cong!")

    res.redirect("back")

}
//[patch]
module.exports.changemulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ")
    console.log(type)
    console.log(ids)

    switch (type) {
        case "active":
            await products.updateMany({ _id: {$in: ids} }, { status: "active"})
            req.flash("success", `cap nhat thanh cong ${ids.length} san pham`)
            break   
        case "inactive":
            await products.updateMany({ _id: {$in: ids} }, { status: "inactive"})
            req.flash("success", `cap nhat thanh cong ${ids.length} san pham`)
            break
        case "delete-all":
            await products.updateMany({ _id: { $in: ids}}, {deleted: true, deleteAt: new Date()})
            req.flash("success", `da xoa thanh cong ${ids.length} san pham`)
            break
               
        case "change-rank":
            for(const item of ids){
                let [id, rank] = item.split("-")
                rank = parseInt(rank)
           
                await products.updateOne( 
                { _id: id}, {rank: rank}
                )
                
            }
            req.flash("success", ` da doi thanh cong ${ids.length} san pham`)
            break
        default:
            break    

        }

        res.redirect("back")


    // console.log(req.body)
    // res.send("ok")
    // res.redirect("back")
}
module.exports.deleteitem = async (req, res) => {

    const id = req.params.id

    await products.updateOne({ _id: id },
         {deleted: true, deleteAt: new Date()})

    res.redirect("back")
}
//[get]]
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
    pagetitle: " them moi san pham"
    })
}
//[post]
module.exports.createpost = async (req, res) => {
   
    req.body.price = parseInt(req.body.price)
    // req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)


    // if(req.body.rank == "") {
    //     const countrank = await products.count();
    //     req.body.rank = countrank + 1
    // } else {  
  
    req.body.rank = parseInt(req.body.rank)
    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`

    }

    // }
    const product = new products(req.body)
    await product.save()
    res.redirect(`${systemconfig.prefixadmin}/products`)

} 
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false, 
            _id: req.params.id
        }
        const product = await products.findOne(find)
        res.render("admin/pages/products/edit", {
            pagetitle: "chinh sua san pham",
            product: product
        })
    
    } catch (error) {
        // req.flash("erorr", "loi")
        res.redirect(`${systemconfig.prefixadmin}/products`)
    }


    
    
}
module.exports.editpatch = async (req, res) => {
    const id = req.params.id
    req.body.price = parseInt(req.body.price)
    req.body.stock = parseInt(req.body.stock)
    req.body.rank = parseInt(req.body.rank)
    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`

    }
    try {
        await products.updateOne({ _id: id }, req.body)
        req.flash("success", "cap nhat thanh cong")
    } catch (eroor) {

        req.flash("erorr", "cap nhat that bai")

    }

   
    res.redirect("back")


  
}
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false, 
            _id: req.params.id
        }
        const product = await products.findOne(find)
        res.render("admin/pages/products/detail", {
            pagetitle: product.title,
            product: product
        })
    
    } catch (error) {
        // req.flash("erorr", "loi")
        res.redirect("/products")
    }

}