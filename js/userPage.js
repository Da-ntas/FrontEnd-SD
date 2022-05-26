function userPage(){
    if(window.sessionStorage.userName){
        let userName = window.sessionStorage.getItem("userName");
        console.log(userName)
        let obj = document.getElementById("userName");
        console.log(obj)
        obj.innerText = `Bem vindo de volta ${userName}`
    }
    else{
        window.location.assign('./notfound.html')
    }
}


document.getElementById("historicoConsultas").addEventListener('click', (event) => {
    event.preventDefault();

    window.location.assign('./historicodeConsultas.html')
})

document.getElementById("agendarConsultas").addEventListener('click', (event) => {
    event.preventDefault();

    window.location.assign('./agendarConsultas.html')
})

document.getElementById("logout").addEventListener('click', (event) => {
    event.preventDefault();

    window.sessionStorage.clear();
    window.location.assign('./index.html')
})