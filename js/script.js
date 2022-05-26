let reqUF = fetch("http://localhost:8080/uf").then((response) => {return (response)})
// let reaCidades = fetch("http://localHost:8080/cidades/cidadeporuf/").then((response) => {return (response)})

async function carregarUF(){
    let UF = await (await reqUF).json();
    let uf = document.getElementById("uf");
    document.getElementById("cidade").setAttribute("disabled", "disabled")

    UF.forEach(element => {
        let options = document.createElement("option")
        let nomUF = element.nomUF;
        let codUF = element.codeUf;
        options.value = codUF;
        options.text = nomUF;

        uf.add(options);
    });
}

function carregarConvenio(){
    let convenio = document.getElementById("convenio");

    let data = [
        {
            nomOption: "Sim",
            nomValue: true
        },
        {
            nomOption: "Não",
            nomValue: false
        }
    ]
    
    data.map((element) => {
        let options = document.createElement("option")
        options.value = element.nomValue
        options.text = element.nomOption

        convenio.add(options);
    })
}

function carregarCidades(cidades){
    let city = document.getElementById("cidade");

    //adicionando a opção default
    let options = document.createElement("option")
    options.value = "";
    options.text = "Cidades";
    options.setAttribute("selected", "selected")
    options.setAttribute("disabled", "disabled")
    city.add(options);

    cidades.forEach(element => {
        let options = document.createElement("option")
        let nomCidades = element.nomCidades;
        let codCidades = element.codeCidades;
        options.value = codCidades;
        options.text = nomCidades;

        city.add(options);
    })
}

document.getElementById("uf").addEventListener("change", async (event) => {
    event.preventDefault();

    document.getElementById("cidade").innerHTML = "";
    document.getElementById("cidade").removeAttribute("disabled", "disabled")
    let uf = document.getElementById("uf").value;
    let reqCidades;
    switch (uf){
        case '1':
            reqCidades = fetch("http://localHost:8080/cidades/cidadeporuf/1").then((response) => {return (response)})
            break;
        case '2':
            reqCidades = fetch("http://localHost:8080/cidades/cidadeporuf/2").then((response) => {return (response)})
            break;
        case '3':
            reqCidades = fetch("http://localHost:8080/cidades/cidadeporuf/3").then((response) => {return (response)})
            break;
        default:
            break;
    }

    let cidades = await (await reqCidades).json()
    await carregarCidades(cidades);
    


})

document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    let data = {
        nome: document.getElementById("name").value,
        email:  document.getElementById("email").value,
        password: document.getElementById("password").value,
        dataNasc: document.getElementById("dataNasc").value,
        cpf: document.getElementById("cpf").value,
        uf: document.getElementById("uf").value,
        cidade: document.getElementById("cidade").value,
        convenio: document.getElementById("convenio").value,
        nomConvenio: document.getElementById("convenio").value
    }

    
    let makePost = fetch("http://localhost:8080/user", {
    method: 'POST',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(data)
    })
    .then((response) => {
        return response
    })

    let userPost = await (await makePost).json();

    if(userPost.status == 500){
        window.alert("Parece que já há uma conta com esse e-mail ou CPF cadastrada");
    }
    else{
        window.alert("Conta criada com sucesso!");
        document.getElementById("form").reset();
    }

})


document.getElementById("formlogin").addEventListener("submit", async (event) => {
    event.preventDefault();

    let email = document.getElementById("emailogin").value;
    let password = document.getElementById("passwordlogin").value;

    let teste = fetch(`http://localhost:8080/user/login?email=${email}`)
    .then((response) => {
        return (response)
    })
    .catch((error) => {
        console.log(error)
    })
    
    let getStatus = await teste
    
    if(getStatus.status == 404){
        window.alert("Favor verificar suas credenciais");
    }
    else{
        let user = await (await teste).json();
        if(user.password == password){
            console.log(user)
            // window.alert("Conta encontrada! Levando para sua página");
            document.getElementById("formlogin").reset();
            window.sessionStorage.setItem("userName", user.nome);
            window.sessionStorage.setItem("userCode", user.code);
            window.sessionStorage.setItem("userUf", user.uf);
            window.sessionStorage.setItem("userCidade", user.cidade);
            window.sessionStorage.setItem("userConvenio", user.convenio);
            window.sessionStorage.setItem("userNomConvenio", user.nomConvenio);
            window.location.assign('./logado.html');
        }
    }
})
//GET
// let teste = fetch("http://localhost:8080/user", {mode: "cors"})
// .then((response) => {
//     return (response)
// })

// let users = await (await teste).json();

// users.map((e) => {
//     console.log(e)
    
// })



//POST
// await fetch("http://localhost:8080/user", {
//     method: 'POST',
//     headers: {
//         "Content-type": "application/json"
//     },
//     body: JSON.stringify({
//         "nome": "Hugo teste",
//         "email": "email3@teste.com",
//         "password": "senhateste",
//         "dataNasc": "06/07/2002",
//         "cpf": 50078336857,
//         "uf": "SP",
//         "cidade": "São Paulo",
//         "convenio": false
//     })
// })
// .then((response) => {
//     console.log(response)
// })