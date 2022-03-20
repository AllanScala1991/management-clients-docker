
async function loginUser(username, password) {
    return await axios({
        method: 'post',
        url: 'http://172.21.0.3:3000/login',
        data: {
            username: username,
            password: password
        }
    })
}

function saveToken(isLogin) {
    if(!isLogin.status) {
        alert(isLogin.message)
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

    const isLogin = await loginUser(username, password)

    saveToken(isLogin.data)
}

document.querySelector("#login-register").onclick = async () => {
    loadRegisterPage()
}