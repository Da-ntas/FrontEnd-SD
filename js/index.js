let info = window.sessionStorage.getItem("codeUser")
document.getElementById("square1").addEventListener('click', (event) => {
    event.preventDefault();
    if(!info){
        window.location.assign("./login.html");
    }
    else{
        window.location.assign("./agendarConsultas.html");
    }
})
document.getElementById("square2").addEventListener('click', (event) => {
    event.preventDefault();
    if(!info){
        window.location.assign("./login.html");
    }
})
document.getElementById("square3").addEventListener('click', (event) => {
    event.preventDefault();
    if(!info){
        window.location.assign("./login.html");
    }
    else{
        window.location.assign("./historicodeConsultas.html");
    }
})