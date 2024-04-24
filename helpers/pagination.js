module.exports = (objectpagination, query) => {
    

    if(query.page){
        objectpagination.currenpage = parseInt(query.page)

    }
    objectpagination.skip = (objectpagination.currenpage - 1) * objectpagination.limititem;
    

    
    // const totalpage = Math.ceil(counttt/objectpagination.limititem)
    // console.log(totalpage)
    // objectpagination.totalpage = totalpage;
    return objectpagination;

}