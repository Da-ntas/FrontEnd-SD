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

    window.location.assign('./userlogado.html');
})
