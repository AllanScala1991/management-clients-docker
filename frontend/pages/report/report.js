async function getCustomers(userId, token) {
    return await axios({
        method: 'get',
        url: `${BASE_URL}/report/customer/${userId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}



$(document).ready(async () => {
    const userId = window.localStorage.getItem('user_id')
    const token = window.localStorage.getItem('token')
    const customer = await getCustomers(userId, token)
    if(customer.data.status) {
        const totalCustomer = customer.data.data.totalCustomers
        const lastCustomer = customer.data.data.lastCustomers[0].email
        document.querySelector('#report-total-customers').textContent = totalCustomer
        document.querySelector('#report-last-customer').textContent = lastCustomer
    }
})