let sessionResult = JSON.parse(window.sessionStorage.getItem('infosconsulta')) 
let consulta = sessionResult.opt.consulta
let information = sessionResult.opt.informations
let resultConsulta = sessionResult.reslt

function resultadoConsultafunc(){

    let unidade = document.getElementById("unidadeSpec")
    let tipoExame = document.getElementById("tipoExamInfo")
    let user = document.getElementById("userInfo")
    let dataAgendada = document.getElementById("dataInfo")
    let horarioAgendado = document.getElementById("horarioInfo")

    unidade.innerText = information.nomUnidade
    tipoExame.innerText = information.nomTipoExame
    user.innerText = information.nomMedico
    dataAgendada.innerText = consulta.dtaAgendada
    horarioAgendado.innerText = consulta.horarioAgendado
}

document.getElementById("enviarResultadoConsulta").addEventListener('click', (event) => {
    event.preventDefault();

    let desc = document.getElementById("descricaoinput").value
    let solic = document.getElementById("solicitacoesinput").value

    if(desc == "" || solic == ""){
        window.alert("Por gentileza preencha os campos");
    }
    else{
        makePostResultado();
    }


    // {
    //     "descricao": "Precisa fazer alguma coisa ali e outra ali",
    //     "solicitacoes": "Tomar aquele remedio por 2 semanas, 3x ao dia",
    //     "codeConsultas": "2"
    // }
})

async function makePostResultado(){
    let desc = document.getElementById("descricaoinput")
    let solic = document.getElementById("solicitacoesinput")

    let data = {
        "descricao": desc.value,
        "solicitacoes": solic. value,
        "codeConsultas": consulta.codeConsultas
    }

    let response = fetch(`http://localhost:8080/resultadoconsulta/${consulta.codeConsultas}`,{
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
        })
        .then((response) => {
            return response
        })

    let res = await response;
    if(res.status == 201){
        alterarStatusConsulta(consulta.codeConsultas);

        window.alert("Descrição e solicitações adicionadas com sucesso!");
        desc.readOnly = true;
        solic.readOnly = true;
    }
    else{
        console.log("b")
    }
}

async function alterarStatusConsulta(id){
    fetch(`http://localhost:8080/consultas/status/${id}?newStatus=Realizada`,{
        method: 'PUT'
    })
}


document.getElementById("goback").addEventListener('click', (event) => {
    event.preventDefault();

        window.location.assign('./prontuariosdodia.html');   
})