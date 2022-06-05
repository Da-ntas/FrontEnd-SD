function formLogin(){
    document.getElementById("login").style.display = "block"
}

document.getElementById("linkCriarConta").addEventListener('click', (event) => {
    event.preventDefault();

    document.getElementById("login").style.display = "none"
    document.getElementById("cadastro").style.display = "block"
    carregarUF();
})

document.getElementById("linkvoltarLogin").addEventListener('click', (event) => {
    event.preventDefault();

    document.getElementById("login").style.display = "block"
    document.getElementById("cadastro").style.display = "none"
})