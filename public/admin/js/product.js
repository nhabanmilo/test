//  change status
const buttonchagestattus = document.querySelectorAll("[button-change]")

if(buttonchagestattus.length > 0) {
    const formchangestatus = document.querySelector('#form-change-status')

    const path = formchangestatus.getAttribute("data-path")
    buttonchagestattus.forEach(button => {
        button.addEventListener("click", () => {

            const statuscurrnet = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            
            let statuschange = statuscurrnet == "active" ? "inactive" : "active"

            const action = path + `/${statuschange}/${id}?_method=PATCH`

            formchangestatus.action = action

            formchangestatus.submit() //ham  ho tro submit

        })
    })

}


// delete item
const buttondelete = document.querySelectorAll("[button-delete]")
if(buttondelete.length > 0) {
    const formdeleteitem = document.querySelector("#form-delete-item")

    const path = formdeleteitem.getAttribute("data-path")

    buttondelete.forEach(button => {
        button.addEventListener("click", () => {
            const isconfim = confim("ban co chac muon xoa san pham  nay")

            if(isconfim) {

                const id = button.getAttribute("data-id")
                const action = `${path}/${id}?_method=DELETE`
                formdeleteitem.submit()

            }
        })
    }) 



}