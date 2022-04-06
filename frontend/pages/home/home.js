function setUsernameText(username) {
    document.querySelector('.user-logged-name label').textContent = username;
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

$(document).ready(async () => {
    let username = window.localStorage.getItem("user")
    setUsernameText(username)
    $('#home-second-container .bottom-container').empty()
    $('#home-second-container .bottom-container').load('pages/report/report.html')

    await isTokenValid()
})

// DASHBOARD BUTTON
document.querySelector('#home-btn-dashboard').onclick = async () => {
    $('#home-second-container .bottom-container').empty()
    $('#home-second-container .bottom-container').load('pages/report/report.html')
}

// CUSTOMER BUTTON
document.querySelector('#home-btn-customer').onclick = async () => {
    $('#home-second-container .bottom-container').empty()
    $('#home-second-container .bottom-container').load('pages/customer/customer.html')
}

// USER BUTTON
document.querySelector("#home-user").onclick = async () => {
    $('#home-second-container .bottom-container').empty()
    $('#home-second-container .bottom-container').load('pages/user/user.html')
}
