function verifyToken() {
    const isToken = window.localStorage.getItem('token')
    if(isToken == null) {
        $('#app').empty()
        $('#app').load("pages/login/login.html")
    } else {
        alert('Voce esta logado')
    }
}

$(document).ready(() => {
    $('#app').load("pages/login/login.html")
   //verifyToken()
})



