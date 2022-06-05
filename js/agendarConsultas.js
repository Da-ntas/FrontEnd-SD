let codeCidade = window.sessionStorage.getItem("userCidade")
let allunidades = fetch(`http://localhost:8080/unidades/cidades/${codeCidade}`).then((response) => {return (response)})
let unidades, endereco, tipoExame, medico;

async function agendamentoConsultas(){
    unidades = await (await allunidades).json();
    let unidadeAgendado = document.getElementById("unidadeAgendado");
  

    unidades.forEach(element => {

        let teste = unidadeAgendado.options;
        let jaTem = false;

            for(const c of teste) {
                if(c.label == element.nomUnidade){
                    jaTem = true;
                }
            }

        if(!jaTem){
            let optionUnidade = document.createElement("option")
            
            let nomUnidade = element.nomUnidade;
            let codUnidade = element.codeUnidades;
            optionUnidade.value = codUnidade;
            optionUnidade.text = nomUnidade;

            unidadeAgendado.add(optionUnidade)
        }
    });
}


async function mountTipoExamesOptions(codUnidade){
    let allTipoExames = await fetch(`http://localhost:8080/tipoexames/unidade/${codUnidade}`).then((response) => {return (response)})
    tipoExame = await allTipoExames.json();
    let tiposExamesOp = document.getElementById("tipoExame");

    //adicionando a opção default
    tiposExamesOp.innerHTML = "";
    tiposExamesOp.removeAttribute("disabled", "disabled")
    let optionsDefault = document.createElement("option")
    optionsDefault.value = "";
    optionsDefault.text = "Tipos exames";
    optionsDefault.setAttribute("selected", "selected")
    optionsDefault.setAttribute("disabled", "disabled")
    tiposExamesOp.add(optionsDefault);

    

    tipoExame.forEach(element => {
        let optionTipoExame = document.createElement("option")

        let exameTipo = element.exameTipo;
        let codeExame = element.codeExame;
        optionTipoExame.value = codeExame;
        optionTipoExame.text = exameTipo;

        tiposExamesOp.add(optionTipoExame);

    })
}

async function mountNomMedicos(codTipoExame){
    let allMedicos = await fetch(`http://localhost:8080/medicos/tipoExame/${codTipoExame}`).then((response) => { return (response)})
    medico = await allMedicos.json();

    let nomMedicoOp = document.getElementById("nomMedicoAgendado");
    
    //adicionando a opção default
    nomMedicoOp.innerHTML = "";
    nomMedicoOp.removeAttribute("disabled", "disabled")
    let optionsDefault = document.createElement("option")
    optionsDefault.value = "";
    optionsDefault.text = "Nome médico";
    optionsDefault.setAttribute("selected", "selected")
    optionsDefault.setAttribute("disabled", "disabled")
    nomMedicoOp.add(optionsDefault);


    medico.map((e) => {
        let optionMed = document.createElement("option")
        optionMed.value = e.codeMedicos;
        optionMed.text = e.nomMedico;

        nomMedicoOp.add(optionMed)
    })
}


document.getElementById("unidadeAgendado").addEventListener("change", async (event) => {
    event.preventDefault();

    let enderecoAgendado = document.getElementById("enderecoAgendado");
    let unidade = document.getElementById("unidadeAgendado");
    let unidadeText = unidade.options[unidade.selectedIndex].text;
    
    
    //adicionando a opção default
    enderecoAgendado.innerHTML = "";
    enderecoAgendado.removeAttribute("disabled", "disabled")
    let optionsDefault = document.createElement("option")
    optionsDefault.value = "";
    optionsDefault.text = "Endereços";
    optionsDefault.setAttribute("selected", "selected")
    optionsDefault.setAttribute("disabled", "disabled")
    enderecoAgendado.add(optionsDefault);


    unidades.forEach(element => {
        
        if(element.nomUnidade === unidadeText){
            
            let optionEndereco = document.createElement("option")

                let nomEmdereco = element.enderecoUnidade;
                let codUnidade = element.codeUnidades;
                optionEndereco.value = codUnidade;
                optionEndereco.text = nomEmdereco;

                enderecoAgendado.add(optionEndereco);
            
        }
    })
    

})

document.getElementById("enderecoAgendado").addEventListener("change", async (event) => {
    event.preventDefault();

    let unidadeValue = document.getElementById("enderecoAgendado").value

    mountTipoExamesOptions(unidadeValue);

})


document.getElementById("tipoExame").addEventListener("change", async (event) => {
    event.preventDefault();

    let tipoExameValue = document.getElementById("tipoExame").value;

    mountNomMedicos(tipoExameValue);
})

document.getElementById("formAgendamento").addEventListener("submit", async (event) => {
    event.preventDefault();

    let userCode = window.sessionStorage.getItem("userCode");

    let data = {
        "dtaAgendada": document.getElementById("dataAgendamento").value,
        "horarioAgendado": document.getElementById("horarioAgendado").value,
        "codMedico": document.getElementById("nomMedicoAgendado").value,
        "statusConsulta": "Agendada",
        "idTipoExame": document.getElementById("tipoExame").value,
        "idUnidadeAgendado": document.getElementById("unidadeAgendado").value,
        "codeUser": userCode
    }

    fetch(`http://localhost:8080/consultas/${userCode}`, {
    method: 'POST',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(data)
    })
    .then((response) => {
        window.alert("Consulta marcada com sucesso!");
        document.getElementById("formAgendamento").reset();
    })

})

document.getElementById("goback").addEventListener('click', (event) => {
    event.preventDefault();

    window.location.assign('./userlogado.html')
})