function medicPage(){
    if(window.sessionStorage.userName){
        let userName = window.sessionStorage.getItem("userName");
        
        let obj = document.getElementById("userName");
        
        obj.innerText = `Bem vindo de volta Doc. ${userName}`
    }
    else{
        window.location.assign('./notfound.html')
    }
}


document.getElementById("buscartodasconsultas").addEventListener('click', (event) => {
    event.preventDefault();
    window.location.assign('./todasconsultas.html')
})

document.getElementById("consultaspendentes").addEventListener('click', (event) => {
    event.preventDefault();
    window.location.assign('./consultaspendentes.html')
})

document.getElementById("logout").addEventListener('click', (event) => {
    event.preventDefault();

    window.sessionStorage.clear();
    window.location.assign('./index.html')
})