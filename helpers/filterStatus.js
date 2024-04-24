module.exports = (query) => {
    let filterstatus = [
        {
            name: "tat ca",
            status: "",
            class: ""
        },
        {
            name: "hoatdong",
            status: "active",
            class: ""
        },
        {
            name: "dunghoatdong",
            status: "inactive",
            class: ""
        }
    ];

    if(query.status) {
        const index = filterstatus.findIndex(item => item.status == query.status);
        filterstatus[index].class = "active"
    }else{
        const index = filterstatus.findIndex(item => item.status == "");
        filterstatus[index].class = "active"
    }
    return filterstatus;
}


