async function loginUser(username, password) {
    return await axios({
        method: 'post',
        url: `${BASE_URL}/login`,
        data: {
            username: username,
            password: password
        }
    })
}

function saveToken(isLogin) {
    $(".loading-container").empty()
    document.querySelector('.loading-container').style.zIndex = "-999"

    if(!isLogin.status) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: isLogin.message,
            confirmButtonColor: '#2469CB'
        })
    } else {
        clearInputs()
        window.localStorage.setItem("token", isLogin.token)
        loadHomePage()
    }
}

function clearInputs() {
    document.querySelector("#login-username").value = ""
    document.querySelector("#login-password").value = ""
}

function loadRegisterPage() {
    $("#app").empty()
    $("#app").load("pages/register/register.html")
}

function loadHomePage() {
    $("#app").empty()
    $("#app").load("pages/home/home.html")
}

document.querySelector("#login-access").onclick = async () => {
    const username = document.querySelector("#login-username").value
    const password = document.querySelector("#login-password").value

    $(".loading-container").load("utils/loading/loading.html")
    document.querySelector('.loading-container').style.zIndex = "999"

    const isLogin = await loginUser(username, password)

    saveToken(isLogin.data)
}

document.querySelector("#login-register").onclick = async () => {
    loadRegisterPage()
}