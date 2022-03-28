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

// BUTTON OPEN REGISTER
document.querySelector("#btn-customer-register").onclick = () => {
    $(".bottom-container").empty()
    $(".bottom-container").load("pages/customer/customer-register.html")
}
