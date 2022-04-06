const BASE_URL = "http://localhost:3000"

async function isTokenValid() {
    const isToken = window.localStorage.getItem('token')
    return await axios({
        method: 'get',
        url: `${BASE_URL}/user/username/${window.localStorage.getItem("user")}`,
        headers: {
            'Authorization': `Bearer ${isToken}`
        }
    })
}

$(document).ready(async () => {
    let logged = await isTokenValid()

    if(!logged.data.status) {
        $('#app').load("pages/login/login.html")
    }else {
        $('#app').load("pages/home/home.html")
    }
    
}) 


