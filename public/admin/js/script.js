// button sstatus
const buttonstatus = document.querySelectorAll("[button-status]")
if(buttonstatus.length > 0) {
    let url = new URL(window.location.href)

    buttonstatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status")

            if(status) {
                url.searchParams.set("status", status)
            }
            else{
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    })


}

// form search

const formsearch = document.querySelector("#form-search")

if(formsearch) {
    let url = new URL(window.location.href)
    formsearch.addEventListener("submit", (e) => {


        e.preventDefault() //ngan chan hanh dong mac dinh, co the tim kiem them nhieu cai khac
        const keyword = e.target.elements.keyword.value
        if(keyword) {
            url.searchParams.set("keywork", keyword)
        } else {
            url.searchParams.delete("keywork")
        }

        window.location.href= url.href
    })
}

// pagination


const buttonpagination = document.querySelectorAll("[button-pagination]")
if(buttonpagination) {
    let url = new URL(window.location.href)

    buttonpagination.forEach(button => {

        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")

            url.searchParams.set("page", page)
            window.location.href = url.href

        })
    })
}

// check box 

const checkboxmulti = document.querySelector("[checkbox-multi]")
if(checkboxmulti) {

    const inputcheckall = checkboxmulti.querySelector("input[name='checkall']")
    const inputid = checkboxmulti.querySelectorAll("input[name='id']")

    inputcheckall.addEventListener("click", () => {
        if(inputcheckall.checked) {
            inputid.forEach(input => {

                input.checked = true
            })
        } else {

            inputid.forEach(input => {
                input.checked = false
            })
        }
    })

    inputid.forEach((input) => {
        input.addEventListener("click", () => {
            const countchecked = checkboxmulti.querySelectorAll(
                "input[name='id]:checked"
            ).length

            if(countchecked == inputid.length) {

                inputcheckall.checked = true
            } else {

                inputcheckall.checked = false
            }
        })
    })

}

// form change multi

const formchangemulti = document.querySelector("[form-change-multi")
if(formchangemulti) {
    formchangemulti.addEventListener("submit", (e) => {

        e.preventDefault
        const checkboxmulti = document.querySelector("[checkbox-multi")
        const inputchecked = checkboxmulti.querySelectorAll(

            "input[name='id']:checked"
        )

        const typechange = e.target.elements.type.value

        if(typechange == "delete-all") {
            const isconfim = confirm("ban co chac muon xoa khong")


            if(!isconfim) {
                return;
            }
        }


        if(inputchecked.length > 0) {
            let ids = []

            const inputids = formchangemulti.querySelector("input[name='ids']")

            inputchecked.forEach(input => {
                const id = input.value

                if(typechange == "change-rank") {
                    const rank = input.closest("tr").querySelector("input[name='rank']").value                
                    ids.push(`${id}-${rank}`)
                } else {

                    ids.push(id)
                }


            })
            inputids.value = ids.join(", ")
            formchangemulti.submit()

        } else {
            alert("vui long chon 1 ban ghi!")
        }

    })
}

// show alert

const showalert = document.querySelector("[show-alert]")
if(showalert) {
    const time = parseInt(showalert.getAttribute("data-time"))
    const closealert = showalert.querySelector("[close-alert]")


    setTimeout(() => {
        showalert.classList.add("alert-hidden")
    }, time)


    closealert.addEventListener("click", () => {
        showalert.classList.add("alert-hidden")
    })
}
// upload image

const uploadimage = document.querySelector("[upload-image]")
if(uploadimage) {
    const uploadimageinput = document.querySelector("[upload-image-input]")
    const uploadimagepreview = document.querySelector("[upload-image-preview]")
    uploadimageinput.addEventListener("change", (e) => {

        console.log(e)
        const file = e.target.files[0]
        if(file) {
            uploadimagepreview.src = URL.createObjectURL(file)
        }
    })

}