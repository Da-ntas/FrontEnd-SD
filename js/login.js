document.getElementById("linkCriarConta").addEventListener('click', (event) => {
    event.preventDefault();

    document.getElementById("login").style.display = "none"
    document.getElementById("cadastro").style.display = "block"
    carregarUF();
})
