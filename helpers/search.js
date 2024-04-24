module.exports = (query) => {
    let objectseach = {
        keyword: ""
    }

    if(query.keyword) {
        objectseach.keyword = query.keyword;
        // tim kiem easy
        const regex = new RegExp(objectseach.keyword, "i");
        objectseach.regex = regex

    }
    return objectseach;
}