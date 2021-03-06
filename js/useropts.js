let setAction = "show";
let action = document.getElementById("actionsup")

document.getElementById("showactions").addEventListener('click', (event) => {
    event.preventDefault();
    
    let action = document.getElementById("actionsup")

    if(setAction === "show"){
        action.style.display = "block";
        setAction = "hide";
    }
    else if(setAction === "hide"){
        action.style.display = "none";
        setAction = "show";
    }
})

function omitirAction(){
    if(setAction === "hide"){
        action.style.display = "none";
        setAction = "show";
    }
}


document.getElementById("goToProfile").addEventListener('click', (event) => {
    event.preventDefault();
    window.location.assign("./profile.html")
})

document.getElementById("changepass").addEventListener('click', (event) => {
    event.preventDefault();
    window.location.assign('./alterarSenha.html');
})


document.getElementById("logout").addEventListener('click', (event) => {
    event.preventDefault();

    window.sessionStorage.clear();
    window.location.assign('./index.html')
})

document.getElementById("homepage").addEventListener('click', (event) => {
    event.preventDefault();

    if(window.sessionStorage.getItem("codMed")){
        window.location.assign('./medicologado.html');   
    }
    else{
        window.location.assign('./userlogado.html');
    }
})


let h1 = document.getElementById("bemvindo")

if(window.sessionStorage.getItem("codMed")){
    h1.innerText = `Bem vindo de volta,  Med. ${window.sessionStorage.getItem("userName")}`
}
else{
    h1.innerText = `Bem vindo de volta,  ${window.sessionStorage.getItem("userName")}`
}
