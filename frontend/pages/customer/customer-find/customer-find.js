
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
    
}

async function updateCustomer(id) {
    
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