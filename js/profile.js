let nomUser = window.sessionStorage.getItem("userName");
let emailUser = window.sessionStorage.getItem("email");
let dataNascUser = window.sessionStorage.getItem("dataNasc");
let codeUf = window.sessionStorage.getItem("userUf");
let codeCidade = window.sessionStorage.getItem("userCidade");

let fullName = document.getElementById("userName");
let email  = document.getElementById("userEmail");
let dataNasc = document.getElementById("userNasc");
let uf  = document.getElementById("userUf");
let cidade = document.getElementById("UserCidade");
const ufInfo = fetch(`http://localhost:8080/uf/${codeUf}`).then((response) => { return response});
const cidadeInfo = fetch(`http://localhost:8080/cidades/${codeCidade}`).then((response) => { return response});

async function carregarInfos(){

    
    let ufUser = await (await ufInfo).json();
    let cidadeUser = await (await cidadeInfo).json();

    if(window.sessionStorage.getItem("codMed")){
        document.getElementById("profileText").innerText = `Perfil do Médico`
    }
    else{
        document.getElementById("profileText").innerText = `Perfil de usuário`
    }

    fullName.innerText = nomUser;
    email.innerText = emailUser;
    dataNasc.innerText = dataNascUser;
    uf.innerText = ufUser.nomUF;
    cidade.innerText = cidadeUser.nomCidades;
}

document.getElementById("goback").addEventListener('click', (event) => {
    event.preventDefault();
    
    if(window.sessionStorage.getItem("codMed")){
        window.location.assign('./medicologado.html');   
    }
    else{
        window.location.assign('./userlogado.html');
    }
})