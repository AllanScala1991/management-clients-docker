async function getCustomers(userId) {
    return await  axios({
        method: 'get',
        url: `${BASE_URL}/customer/${userId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

async function updateCustomer(name, birthDate, zipCode, city, district, address,
    addressNumber, state, phone, email, userId) {
        return await  axios({
            method: 'patch',
            url: `${BASE_URL}/customer`,
            headers: {
                'Authorization': `Bearer ${token}`
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

async function deleteCustomer(userId) {
    return await  axios({
        method: 'delete',
        url: `${BASE_URL}/customer/${userId}`,
        headers: {
            'Authorization': `Bearer ${token}`
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

// BUTTON OPEN CUSTOMER REGISTER
document.querySelector("#btn-customer-register").onclick = async () => {
    $(".bottom-container").empty()
    $(".bottom-container").load("pages/customer/customer-register/customer-register.html")
}

// BUTTON OPEN CUSTOMER FIND
document.querySelector("#btn-customer-search").onclick = async () => {
    $(".bottom-container").empty()
    $(".bottom-container").load("pages/customer/customer-find/customer-find.html")
}

$(document).ready(async () => {
    await isTokenValid()
})
