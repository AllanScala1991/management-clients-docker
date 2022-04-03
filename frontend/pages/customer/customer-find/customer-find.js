// buscar por nome
// adicionar os loading onde precisa
// adicionar as propriedades para testes nas tags que faltam

async function loadingAllCustomers() {
    return await axios({
        method: 'get',
        url: `${BASE_URL}/customer/${window.localStorage.getItem("user_id")}`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        }
    })
}

function mountCustomersTable(customers) {
    $(".customer-find-results-container").empty()
    const customerTable = document.querySelector(".customer-find-results-container")
    customers.map(customer => {
        let row = document.createElement('div')
        row.className = "report-row"
        row.id = customer.id
        let name = document.createElement('div')
        name.className = "report-column"
        name.innerText = customer.name
        let email = document.createElement('div')
        email.className = "report-column"
        email.innerText = customer.email
        let phone = document.createElement('div')
        phone.className = "report-column"
        phone.innerText = customer.phone
        let buttons = document.createElement('div')
        buttons.className = "report-column"
        let buttonUpdate = document.createElement('button')
        buttonUpdate.className = "report-buttons report-btn-update"
        buttonUpdate.innerText = "Editar"
        buttonUpdate.onclick = () => {updateCustomer(customer.id)}
        let buttonDelete = document.createElement('button')
        buttonDelete.className = "report-buttons report-btn-delete"
        buttonDelete.innerText = "Deletar"
        buttonDelete.onclick = () => {deleteCustomer(customer.id)}
        
        buttons.appendChild(buttonUpdate)
        buttons.appendChild(buttonDelete)
        row.appendChild(name)
        row.appendChild(email)
        row.appendChild(phone)
        row.appendChild(buttons)
        customerTable.appendChild(row)
    })
}

function mountCustomer(name, birthDate, zipCode, city, district, address, addressNumber, state, phone, email) {
    document.querySelector(".customer-update-container").style.zIndex = "888"
    document.querySelector(".customer-update-container").style.visibility = "visible"
    document.querySelector("#customer-update-name").value = name
    document.querySelector("#customer-update-birth").value = birthDate
    document.querySelector("#customer-update-cep").value = zipCode
    document.querySelector("#customer-update-city").value = city
    document.querySelector("#customer-update-district").value = district
    document.querySelector("#customer-update-address").value = address
    document.querySelector("#customer-update-number").value = addressNumber
    document.querySelector("#customer-update-state").value = state
    document.querySelector("#customer-update-phone").value = phone
    document.querySelector("#customer-update-email").value = email
}

async function updateCustomer(id) {
    const customer = await axios({
        method: 'get',
        url: `${BASE_URL}/customer/id/${window.localStorage.getItem("user_id")}/${id}`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        }
    })

    if(customer.data.status) {
        const myCustomer = customer.data.data[0]
        window.sessionStorage.setItem("customer_id", myCustomer.id)
        mountCustomer(myCustomer.name, myCustomer.birthDate, myCustomer.zipCode, myCustomer.city,
            myCustomer.district, myCustomer.address, myCustomer.addressNumber.toString(), myCustomer.state, myCustomer.phone, myCustomer.email)
    }else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: customer.data.message,
            confirmButtonColor: '#2469CB'
        })
    }
}

async function deleteCustomer(id) {
    const customerDelete = await axios({
        method: 'delete',
        url: `${BASE_URL}/customer/${id}`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        }
    })

    if(customerDelete.data.status) {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso...',
            text: customerDelete.data.message,
            confirmButtonColor: '#2469CB'
        })
    }else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: customerDelete.data.message,
            confirmButtonColor: '#2469CB'
        })
    }

    await loadingAllCustomers()

    const customers = await loadingAllCustomers()
    mountCustomersTable(customers.data.data)
}

//BTN SAVE
document.querySelector("#customer-update-btn-save").onclick = async () => {
    const name = document.querySelector("#customer-update-name").value
    const birth = document.querySelector("#customer-update-birth").value
    const cep = document.querySelector("#customer-update-cep").value
    const city = document.querySelector("#customer-update-city").value
    const district = document.querySelector("#customer-update-district").value
    const address = document.querySelector("#customer-update-address").value
    const number = document.querySelector("#customer-update-number").value
    const state = document.querySelector("#customer-update-state").value
    const phone = document.querySelector("#customer-update-phone").value
    const email = document.querySelector("#customer-update-email").value
    const customerId = window.sessionStorage.getItem("customer_id")

    const save = await axios({
        method: 'patch',
            url: `${BASE_URL}/customer`,
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            data: {
                customerId: customerId,
                name: name,
                birthDate: birth,
                zipCode: cep,
                city: city,
                district: district,
                address: address,
                addressNumber: parseInt(number),
                state: state,
                phone: phone,
                email: email,
                userId: `${window.sessionStorage.getItem('user_id')}`
            }
    })

    if(save.data.status) {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso...',
            text: save.data.message,
            confirmButtonColor: '#2469CB'
        })
    }else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: save.data.message,
            confirmButtonColor: '#2469CB'
        })
    }
}

//BTN CLOSE 
document.querySelector("#customer-update-btn-close").onclick = async () => {
    document.querySelector(".customer-update-container").style.zIndex = "-888"
    document.querySelector(".customer-update-container").style.visibility = "hidden"
    document.querySelector("#customer-update-name").value = ""
    document.querySelector("#customer-update-birth").value = ""
    document.querySelector("#customer-update-cep").value = ""
    document.querySelector("#customer-update-city").value = ""
    document.querySelector("#customer-update-district").value = ""
    document.querySelector("#customer-update-address").value = ""
    document.querySelector("#customer-update-number").value = ""
    document.querySelector("#customer-update-state").value = ""
    document.querySelector("#customer-update-phone").value = ""
    document.querySelector("#customer-update-email").value = ""
    window.sessionStorage.setItem("customer_id", "")

    await loadingAllCustomers()

    const customers = await loadingAllCustomers()
    mountCustomersTable(customers.data.data)
}

$(document).ready(async () => {
    const customers = await loadingAllCustomers()
    const totalCustomers = customers.data.status

    if(!totalCustomers) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: customers.data.message,
            confirmButtonColor: '#2469CB'
        })
    }else {
        mountCustomersTable(customers.data.data)
    }
    


})