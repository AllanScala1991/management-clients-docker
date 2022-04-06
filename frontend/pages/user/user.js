async function getUser() {
    return await axios({
        method: 'get',
        url: `${BASE_URL}/user/id/${window.localStorage.getItem("user_id")}`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        }
    })
}

async function updateUser(username, email) {
    return await axios({
        method: 'patch',
        url: `${BASE_URL}/user`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        },
        data: {
            username: username,
            email: email,
            id: `${window.localStorage.getItem("user_id")}`
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

function mountUserInformations(user) {
    document.querySelector("#input-user-username").value = user.username
    document.querySelector("#input-user-email").value = user.email
}

$(document).ready(async () => {
    document.querySelector('.loading-container').style.zIndex = "999"
    const myUser = await getUser()
    document.querySelector('.loading-container').style.zIndex = "-999"
    const user = myUser.data.data[0]
    mountUserInformations(user)
})

// BTN UPDATE USER
document.querySelector("#btn-user-update").onclick = () => {
    document.querySelector("#input-user-username").readOnly = false
    document.querySelector("#input-user-email").readOnly = false
    document.querySelector("#input-user-username").style.backgroundColor = "white"
    document.querySelector("#input-user-email").style.backgroundColor = "white"
    document.querySelector("#btn-user-save").disabled = false
    document.querySelector("#btn-user-save").style.cursor = "pointer"
    document.querySelector("#btn-user-save").style.backgroundColor = "#2469CB"
}

// BTN SAVE USER
document.querySelector("#btn-user-save").onclick = async () => {
    const username = document.querySelector("#input-user-username").value
    const email = document.querySelector("#input-user-email").value
    document.querySelector('.loading-container').style.zIndex = "999"
    const userUpdate = await updateUser(username, email)
    document.querySelector('.loading-container').style.zIndex = "-999"

    if(userUpdate.data.status) {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso...',
            text: userUpdate.data.message,
            confirmButtonColor: '#2469CB'
        })
    }else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: userUpdate.data.message,
            confirmButtonColor: '#2469CB'
        })
    }
}