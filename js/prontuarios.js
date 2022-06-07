let codeMedico = window.sessionStorage.getItem("codMed")
let allconsultas = fetch(`http://localhost:8080/consultas/medConsultas/${codeMedico}`).then((response) => {return (response)})
let consultas;
let arrConsultas = [];
let arrObj = [];
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

async function carregarProntuarios(consultas){
    consultas = await (await allconsultas).json()
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

        if(dataUser == dataSplit && infoConsulta.statusConsulta != "Desmarcada"){
            
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

        

            
            inputResult.setAttribute("onclick", `loadResultConsulta(${infoConsulta.codeConsultas})`)
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


document.getElementById("goback").addEventListener('click', (event) => {
    event.preventDefault();

        window.location.assign('./medicologado.html');   
})
