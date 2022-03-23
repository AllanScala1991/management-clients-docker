function setUsernameText(username) {
    document.querySelector('.user-logged-name label').textContent = username;
}

$(document).ready(() => {
    let username = window.localStorage.getItem("user")
    setUsernameText(username)
    $('#home-second-container .bottom-container').empty()
    $('#home-second-container .bottom-container').load('pages/report/report.html')
})

// DASHBOARD BUTTON
document.querySelector('#home-btn-dashboard').onclick = () => {
    $('#home-second-container .bottom-container').empty()
    $('#home-second-container .bottom-container').load('pages/report/report.html')
}

// CUSTOMER BUTTON
document.querySelector('#home-btn-customer').onclick = () => {
    $('#home-second-container .bottom-container').empty()
    $('#home-second-container .bottom-container').load('pages/customer/customer.html')
}
