module.exports.createpost = (req, res, next) => {
    if(!req.body.title) {
        req.flash("error", `vui long nhap tieu de`)
        res.redirect("back")
        return;
    }
    next();
}