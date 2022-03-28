const BASE_URL = "http://172.21.0.3:3000"

function verifyToken() {
    const isToken = window.localStorage.getItem('token')
    if(isToken == null) {
        $('#app').empty()
        $('#app').load("pages/login/login.html")
    } else {
        $('#app').empty()
        $('#app').load("pages/home/home.html")
    }
}

$(document).ready(() => {
    $('#app').load("pages/login/login.html") // TROCAR PARA LOGIN QUANDO FINALIZAR
   //verifyToken()
})



