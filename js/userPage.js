function userPage(){
    if(!window.sessionStorage.userName){
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

document.getElementById("changepass").addEventListener('click', (event) => {
    event.preventDefault();
    
})
