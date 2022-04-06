async function findCep(cep) {
    return await  axios({
        method: 'get',
        url: `${BASE_URL}/cep/${cep}`,
    })
}

async function createCustomer(name, birthDate, zipCode, city, district, address,
    addressNumber, state, phone, email, userId) {
        return await  axios({
            method: 'post',
            url: `${BASE_URL}/customer`,
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            data: {
                name: name,
                birthDate: birthDate,
                zipCode: zipCode,
                city: city,
                district: district,
                address: address,
                addressNumber: addressNumber,
                state: state,
                phone: phone,
                email: email,
                userId: userId
            }
        })
}

async function isTokenValid() {
    const isToken = window.localStorage.getItem('token')
    const isLogged = await axios({
        method: 'get',
        url: `${BASE_URL}/user/username/${window.localStorage.getItem("user")}`,
        headers: {
            'Authorization': `Bearer ${isToken}`
        }
    })

    if(!isLogged.data.status) {
        $('#app').empty()
        $('#app').load("pages/login/login.html")
    }
}

function backCustomerPage() {
    $(".bottom-container").empty()
    $(".bottom-container").load("pages/customer/customer.html")
}

function clearInputs() {
    document.querySelector("#customer-register-name").value = ""
    document.querySelector("#customer-register-date").value = ""
    document.querySelector("#customer-register-cep").value = ""
    document.querySelector("#customer-register-city").value = ""
    document.querySelector("#customer-register-district").value = ""
    document.querySelector("#customer-register-address").value = ""
    document.querySelector("#customer-register-number").value = ""
    document.querySelector("#customer-register-state").value = ""
    document.querySelector("#customer-register-phone").value = ""
    document.querySelector("#customer-register-email").value = ""
}

function openModal(customer) {
    if(customer.data.status) {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso...',
            text: customer.data.message,
            confirmButtonColor: '#2469CB'
        })
        clearInputs()
    }else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: customer.data.message,
            confirmButtonColor: '#2469CB'
        })
    }
}

// FIND CEP EVENT
document.querySelector("#customer-register-cep").onblur = async () => {
    const cep = document.querySelector("#customer-register-cep").value

    if(cep) {
        $(".loading-container").load("utils/loading/loading.html")
        document.querySelector('.loading-container').style.zIndex = "999"

        const searchCep = await findCep(cep)

        if(!searchCep.data.status) {
            $(".loading-container").empty()
            document.querySelector('.loading-container').style.zIndex = "-999"
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Preencha um CEP valido",
                confirmButtonColor: '#2469CB'
            })
        }

        document.querySelector('#customer-register-address').value = searchCep.data.data.logradouro
        document.querySelector('#customer-register-district').value = searchCep.data.data.bairro
        document.querySelector('#customer-register-city').value = searchCep.data.data.localidade
        document.querySelector('#customer-register-state').value = searchCep.data.data.uf

        $(".loading-container").empty()
        document.querySelector('.loading-container').style.zIndex = "-999"
    }
    
}

// SAVE CUSTOMER
document.querySelector("#customer-btn-save").onclick = async () => {
    $(".loading-container").load("utils/loading/loading.html")
    document.querySelector('.loading-container').style.zIndex = "999"

    const name = document.querySelector("#customer-register-name").value
    const birthDate = document.querySelector("#customer-register-date").value
    const zipCode = document.querySelector("#customer-register-cep").value
    const city = document.querySelector("#customer-register-city").value
    const district = document.querySelector("#customer-register-district").value
    const address = document.querySelector("#customer-register-address").value
    const addressNumber = parseInt(document.querySelector("#customer-register-number").value)
    const state = document.querySelector("#customer-register-state").value
    const phone = document.querySelector("#customer-register-phone").value
    const email = document.querySelector("#customer-register-email").value
    const userId = window.localStorage.getItem("user_id")

    const customer = await createCustomer(name, birthDate, zipCode, city, district, address,
        addressNumber, state, phone, email, userId)

    $(".loading-container").empty()
    document.querySelector('.loading-container').style.zIndex = "-999"

   openModal(customer)
}

// BACK CUSTOMER PAGE
document.querySelector("#customer-btn-back").onclick = () => {
    backCustomerPage()
}

$(document).ready(async () => {
    await isTokenValid()
})