async function registerUser(username, password, email){
    return await axios({
        method: 'post',
        url: `${BASE_URL}/user`,
        data: {
            username: username,
            password: password,
            email: email
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

function clearInputs(){
    document.querySelector("#register-username").value = ""
    document.querySelector("#register-password").value = ""
    document.querySelector("#register-email").value = ""
}

function backLoginPage(){
    $("#app").empty()
    $("#app").load("pages/login/login.html")
}

function isUserValidate(user){
    $(".loading-container").empty()
    document.querySelector('.loading-container').style.zIndex = "-999"

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: user.message,
        confirmButtonColor: '#2469CB'
    })

    if(user.status) {
        clearInputs()
        backLoginPage()
        Swal.fire({
            icon: 'success',
            title: 'Sucesso...',
            text: user.message,
            confirmButtonColor: '#2469CB'
        })
    }
}

document.querySelector("#register-confirm").onclick = async () => {
    const username = document.querySelector("#register-username").value
    const password = document.querySelector("#register-password").value
    const email = document.querySelector("#register-email").value

    $(".loading-container").load("utils/loading/loading.html")
    document.querySelector('.loading-container').style.zIndex = "999"

    const user = await registerUser(username, password, email)

    isUserValidate(user.data)

    await isTokenValid()
}

document.querySelector("#register-back").onclick = async () => {
    backLoginPage()
}