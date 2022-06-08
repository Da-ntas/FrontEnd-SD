let codeMedico = window.sessionStorage.getItem("codMed")
let allconsultas = fetch(`http://localhost:8080/consultas/medConsultas/${codeMedico}`).then((response) => {return (response)})
let consultas;
let arrConsultas = [];
let arrObj = [];

async function montarProntuarios() {
    consultas = await (await allconsultas).json()
    
    carregarProntuariosDia(consultas);
    
}


async function getInfos(codeUnidade, codeTipoExame, codeUser){
    let unidadeinfo = fetch(`http://localhost:8080/unidades/${codeUnidade}`).then((response) => {return (response)})
    let tipoexameinfo = fetch(`http://localhost:8080/tipoexames/${codeTipoExame}`).then((response) => { return (response)})
    let userinfo = fetch(`http://localhost:8080/user/${codeUser}`).then((response) => { return (response)})
    // let medicoinfo = fetch(`http://localhost:8080/medicos/1`).then((response) => { return (response)})
    
    let unidade = await (await unidadeinfo).json();
    let tipoexame = await (await tipoexameinfo).json();
    let user = await (await userinfo).json();
    
        return {
            nomUnidade: unidade.nomUnidade,
            enderecoUnidade: unidade.enderecoUnidade,
            nomTipoExame: tipoexame.exameTipo,
            nomMedico: user.nome
        }
}

function formatData(date){
    
    let parseDate = date.split('/');
    let data = new Date(parseDate[2], parseDate[1] - 1, parseDate[0]);
    return `${data.getDay()}, ${data.getMonth()} - ${data.getFullYear()}`;
}

async function carregarProntuariosDia(consultas){
    
    let cardconsultas = document.getElementById("cardsProntuarios");
    cardconsultas.innerHTML = "";
    let data = new Date();
    let dataSplit = `${data.getDay()}, ${data.getMonth()} - ${data.getFullYear()}`

    if(consultas.length == 0){
        let text = document.createTextNode("Nenhum prontuário encontrado :(")

        cardconsultas.appendChild(text)
    }

    await Promise.all(consultas.map(async (infoConsulta) => {

        let dataUser = formatData(infoConsulta.dtaAgendada);

        if(dataUser == dataSplit && filterStatusConsulta(infoConsulta.statusConsulta)){
            
            let infos = await (getInfos(infoConsulta.idUnidadeAgendado, infoConsulta.idTipoExame, infoConsulta.codeUser))
            arrConsultas.push({
                consulta: infoConsulta,
                informations: infos
            })

            arrObj.push({
                consulta: infoConsulta.codeConsultas,
                data: infoConsulta.dtaAgendada,
                hora: infoConsulta.horarioAgendado
            })

            let divCard = document.createElement("div");
            let divSuperior = document.createElement("div");
            let divInferior = document.createElement("div");
            let spanSuperior1 = document.createElement("span");
            let spanSuperior2 = document.createElement("span");
            let spanInferior1 = document.createElement("span");
            let spanInferior2 = document.createElement("span");
            let inputResult = document.createElement("input");
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let p3 = document.createElement("p");
            let p4 = document.createElement("p");
            let p5 = document.createElement("p");
            let p6 = document.createElement("p");
            let p7 = document.createElement("p");

            let textStatus = document.createTextNode(`Status: ${infoConsulta.statusConsulta}`);
            let textData = document.createTextNode(`Data Agendada: ${infoConsulta.dtaAgendada}`);
            let textHorario = document.createTextNode(`Horario agendado: ${infoConsulta.horarioAgendado}`);
            let textUnidade = document.createTextNode(`Unidade agendada: ${infos.nomUnidade}`);
            let textEndereco = document.createTextNode(`Endereço agendado: ${infos.enderecoUnidade}`);
            let textTipoExame = document.createTextNode(`Tipo de exame: ${infos.nomTipoExame}`);
            let textNomMedico = document.createTextNode(`Nome do médico: ${infos.nomMedico}`);

            divCard.className = "card"
            divSuperior.className = "superior"
            divInferior.className = "inferior"
            spanSuperior1.className = "dateHour"
            spanSuperior2.className = "unidadeInfo"
            spanInferior1.className = "exameMedico"
            spanInferior2.className = "inputResultado"
            inputResult.className = "botaoPesquisar"

        

            
            inputResult.setAttribute("onclick", `loadResultProntuario(${infoConsulta.codeConsultas})`)
            inputResult.setAttribute("type", "button")
            inputResult.setAttribute("value", "Resultado")
            spanInferior2.appendChild(inputResult)


            p1.appendChild(textStatus)
            p2.appendChild(textData)
            p3.appendChild(textHorario)
            p4.appendChild(textUnidade)
            p5.appendChild(textEndereco)
            p6.appendChild(textTipoExame)
            p7.appendChild(textNomMedico)
            ///resultadoconsulta/consulta
            spanSuperior1.appendChild(p1)
            spanSuperior1.appendChild(p2)
            spanSuperior1.appendChild(p3)
            spanSuperior2.appendChild(p4)
            spanSuperior2.appendChild(p5)
            spanInferior1.appendChild(p6)
            spanInferior1.appendChild(p7)
            
            divSuperior.appendChild(spanSuperior1)
            divSuperior.appendChild(spanSuperior2)
            divInferior.appendChild(spanInferior1)
            divInferior.appendChild(spanInferior2)
            divCard.appendChild(divSuperior)
            divCard.appendChild(divInferior)

            cardconsultas.appendChild(divCard)
        
        }

    }))
}

async function carregarProntuariosSemana(consultaFormatada){

    let cardsProntuarios = document.getElementById("cardsProntuarios");
    cardsProntuarios.innerHTML = "";
    let data = new Date();
    // let teste = data.toGMTString().toISOString();

    await Promise.all(consultaFormatada.map(async (infoConsulta) => {

        // let dataUser = formatData(infoConsulta.dtaAgendada);    
        let parseDate = infoConsulta.dtaAgendada.split('/');
        let prevdata = new Date(`${parseDate[2]}-${parseDate[1]}-${parseDate[0]}`);
    
        let dataUser = new Date(prevdata);

        
        let cardconsultas = document.getElementById("cardsProntuarios");

        if(data <= dataUser){
            
            let infos = await (getInfos(infoConsulta.idUnidadeAgendado, infoConsulta.idTipoExame, infoConsulta.codeUser))
            arrConsultas.push({
                consulta: infoConsulta,
                informations: infos
            })

            arrObj.push({
                consulta: infoConsulta.codeConsultas,
                data: infoConsulta.dtaAgendada,
                hora: infoConsulta.horarioAgendado
            })

            let divCard = document.createElement("div");
            let divSuperior = document.createElement("div");
            let divInferior = document.createElement("div");
            let spanSuperior1 = document.createElement("span");
            let spanSuperior2 = document.createElement("span");
            let spanInferior1 = document.createElement("span");
            let spanInferior2 = document.createElement("span");
            let inputResult = document.createElement("input");
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let p3 = document.createElement("p");
            let p4 = document.createElement("p");
            let p5 = document.createElement("p");
            let p6 = document.createElement("p");
            let p7 = document.createElement("p");

            let textStatus = document.createTextNode(`Status: ${infoConsulta.statusConsulta}`);
            let textData = document.createTextNode(`Data Agendada: ${infoConsulta.dtaAgendada}`);
            let textHorario = document.createTextNode(`Horario agendado: ${infoConsulta.horarioAgendado}`);
            let textUnidade = document.createTextNode(`Unidade agendada: ${infos.nomUnidade}`);
            let textEndereco = document.createTextNode(`Endereço agendado: ${infos.enderecoUnidade}`);
            let textTipoExame = document.createTextNode(`Tipo de exame: ${infos.nomTipoExame}`);
            let textNomMedico = document.createTextNode(`Nome do médico: ${infos.nomMedico}`);

            divCard.className = "card"
            divSuperior.className = "superior"
            divInferior.className = "inferior"
            spanSuperior1.className = "dateHour"
            spanSuperior2.className = "unidadeInfo"
            spanInferior1.className = "exameMedico"
            spanInferior2.className = "inputResultado"
            inputResult.className = "botaoPesquisar"

        

            
            inputResult.setAttribute("onclick", `loadResultProntuario(${infoConsulta.codeConsultas})`)
            inputResult.setAttribute("type", "button")
            inputResult.setAttribute("value", "Resultado")
            inputResult.setAttribute("disabled", "disabled")
            spanInferior2.appendChild(inputResult)


            p1.appendChild(textStatus)
            p2.appendChild(textData)
            p3.appendChild(textHorario)
            p4.appendChild(textUnidade)
            p5.appendChild(textEndereco)
            p6.appendChild(textTipoExame)
            p7.appendChild(textNomMedico)
            ///resultadoconsulta/consulta
            spanSuperior1.appendChild(p1)
            spanSuperior1.appendChild(p2)
            spanSuperior1.appendChild(p3)
            spanSuperior2.appendChild(p4)
            spanSuperior2.appendChild(p5)
            spanInferior1.appendChild(p6)
            spanInferior1.appendChild(p7)
            
            divSuperior.appendChild(spanSuperior1)
            divSuperior.appendChild(spanSuperior2)
            divInferior.appendChild(spanInferior1)
            divInferior.appendChild(spanInferior2)
            divCard.appendChild(divSuperior)
            divCard.appendChild(divInferior)

            cardconsultas.appendChild(divCard)
        
        }

    }))
}

async function loadResultProntuario(id){
    let resultadoConsultaInfo = await fetch(`http://localhost:8080/consultas/${id}`)
    let resultadoConsulta = await (await resultadoConsultaInfo).json();
    
    if(resultadoConsultaInfo.status != 404){

        let options = arrConsultas.find(ops => ops.consulta.codeConsultas == id)

        let objinfos = {
            opt: options,
            reslt: resultadoConsulta
        }
        let txtopts = JSON.stringify(objinfos)

        console.log(txtopts);
        window.sessionStorage.setItem('infosconsulta', txtopts)
        window.location.assign('./resultadoprontuario.html');
    }
    else{
        window.alert("Página indisponivel no momento");
    }
}

function filterStatusConsulta(op){
    return !(op === "Realizada" || op === "Desmarcada");
}

function filterarray(op){
    
    if(op === "Realizada" || op === "Desmarcada"){
        return
    }

    return op;
}


document.getElementById("goback").addEventListener('click', (event) => {
    event.preventDefault();

        window.location.assign('./medicologado.html');   
})


document.getElementById("filtrar").addEventListener('change', (event) => {
    event.preventDefault();

    let option = document.getElementById("filtrar").value
    if(option == "Day"){
        carregarProntuariosDia(consultas);
    }
    else{
        let filteredConsultas = consultas.filter((e) => filterarray(e.statusConsulta))
        carregarProntuariosSemana(filteredConsultas);
    }
})

