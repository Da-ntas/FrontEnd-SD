let codeUser = window.sessionStorage.getItem("userCode");

let allconsultas = fetch(`http://localhost:8080/consultas/userConsultas/${codeUser}`).then((response) => {return (response)})
let consultas;
let arrConsultas = [];
// let tipoExame = 
// let unidadeAgendada = 


async function getInfos(codeUnidade, codeTipoExame, codeMedico){
    let unidadeinfo = fetch(`http://localhost:8080/unidades/${codeUnidade}`).then((response) => {return (response)})
    let tipoexameinfo = fetch(`http://localhost:8080/tipoexames/${codeTipoExame}`).then((response) => { return (response)})
    // let medicoinfo = fetch(`http://localhost:8080/medicos/${codeMedico}`).then((response) => { return (response)})
    let medicoinfo = fetch(`http://localhost:8080/medicos/1`).then((response) => { return (response)})
    
    let unidade = await (await unidadeinfo).json();
    let tipoexame = await (await tipoexameinfo).json();
    let medico = await (await medicoinfo).json();

        return {
            nomUnidade: unidade.nomUnidade,
            enderecoUnidade: unidade.enderecoUnidade,
            nomTipoExame: tipoexame.exameTipo,
            nomMedico: medico.nomMedico
        }
}

async function montarConsultas(consultas){
    // let body = document.body;
    let cardconsultas = document.getElementById("cardsConsultas");
    cardconsultas.innerHTML = "";

    await Promise.all(consultas.map(async (infoConsulta) => {

        let infos = await (getInfos(infoConsulta.idUnidadeAgendado, infoConsulta.idTipoExame, infoConsulta.codMedidoAgendado))
        arrConsultas.push({
            consulta: infoConsulta,
            informations: infos
        })
        
        let divCard = document.createElement("div");
        let divSuperior = document.createElement("div");
        let divInferior = document.createElement("div");
        let spanSuperior1 = document.createElement("span");
        let spanSuperior2 = document.createElement("span");
        let spanInferior1 = document.createElement("span");
        let spanInferior2 = document.createElement("span");
        let inputDesmarcar = document.createElement("input");
        let inputRemarcar = document.createElement("input");
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
        inputDesmarcar.className = "botaoPesquisar desmarcar"
        inputRemarcar.className = "botaoPesquisar remarcar"

    

        if(infoConsulta.statusConsulta === "Agendada"){
            inputDesmarcar.setAttribute("onclick", `montarModalDesmarcarConsulta(${infoConsulta.codeConsultas})`)
            inputDesmarcar.setAttribute("type", "button")
            inputDesmarcar.setAttribute("value", "Desmarcar")
            
            inputRemarcar.setAttribute("onclick", `remarcarConsulta(${infoConsulta.codeConsultas})`)
            inputRemarcar.setAttribute("type", "button")
            inputRemarcar.setAttribute("value", "Remarcar")
            spanInferior2.appendChild(inputDesmarcar)
            spanInferior2.appendChild(inputRemarcar)
        }
        else if(infoConsulta.statusConsulta === "Realizada"){
            inputResult.setAttribute("onclick", `loadResultConsulta(${infoConsulta.codeConsultas})`)
            inputResult.setAttribute("type", "button")
            inputResult.setAttribute("value", "Resultado")
            spanInferior2.appendChild(inputResult)
        }


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

    }))
}

async function carregarConsultas() {
    consultas = await (await allconsultas).json()
    
    montarConsultas(consultas);
    
}

async function carregarConsultaPorFiltro(status){
    let id = window.sessionStorage.getItem("userCode");
    let filteredConsultas = fetch(`http://localhost:8080/consultas/status/${status}/${id}`).then((response) => {return (response)})
    let filteredConsultasJSON = await (await filteredConsultas).json();
    
    if(filteredConsultasJSON.status != 404){
        
        montarConsultas(filteredConsultasJSON);
    } 
}

async function loadResultConsulta(id){
    let resultadoConsultaInfo = await fetch(`http://localhost:8080/resultadoconsulta/consulta/${id}`)
    let resultadoConsulta = await (await resultadoConsultaInfo).json();
    
    if(resultadoConsultaInfo.status != 404){

        let options = arrConsultas.find(ops => ops.consulta.codeConsultas == id)

        let objinfos = {
            opt: options,
            reslt: resultadoConsulta
        }
        let txtopts = JSON.stringify(objinfos)

        window.sessionStorage.setItem('infosconsulta', txtopts)
        window.location.assign('./resultadoConsulta.html');
    }
    else{
        window.alert("O resultado dessa consulta ainda não está dispoínivel");
    }
}

function fecharModal(){
    let modalbg = document.getElementById("modalDesmarcar");

    modalbg.innerHTML = ''
    modalbg.style.display = 'none'

}

async function desmarcarConsulta(id){
    
    let consulta = fetch(`http://localhost:8080/consultas/${id}`).then((response) => {return (response)})
    let data = await (await consulta).json();

    data.statusConsulta = "Desmarcada";

    fetch(`http://localhost:8080/consultas`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })

    location.reload();
    
}

function montarModalDesmarcarConsulta(id){
    let modalbg = document.getElementById("modalDesmarcar");
    let divgeral = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let h4 = document.createElement("h4");
    let buttonSim = document.createElement("button");
    let buttonNao = document.createElement("button");
    let buttonClose = document.createElement("button");

    divgeral.style.width = '450px'
    divgeral.style.height = '150px'
    // divgeral.style.marginTop = '150px'
    divgeral.style.backgroundColor = 'white'

    div1.style.width = 'inherit'
    div1.style.height = '50px'
    div1.style.display = 'flex'
    div1.style.borderBottom = '1px solid black'
    div1.style.alignItems = 'center'
    div1.style.justifyContent = 'center'
    
    div2.style.width = 'inherit'
    div2.style.height = '100px';
    div2.style.display = 'flex'
    div2.style.alignItems = 'center'
    div2.style.justifyContent = 'space-evenly'

    buttonSim.textContent = 'Sim'
    buttonNao.textContent = 'Nao'
    buttonClose.textContent = 'X'
    h4.textContent = 'Deseja desmarcar essa consulta?'
    
    buttonClose.style.marginLeft = '70px'
    buttonClose.setAttribute("onclick", `fecharModal()`)

    buttonSim.setAttribute("value", "Sim")
    buttonSim.setAttribute("onclick", `desmarcarConsulta(${id})`)

    buttonNao.setAttribute("value", "Não")
    buttonNao.setAttribute("onclick", `fecharModal()`)

    buttonSim.style.backgroundColor = 'white'
    buttonSim.style.width = '150px'
    buttonSim.style.height = '35px'
    buttonNao.style.backgroundColor = 'red'
    buttonNao.style.color = 'white'
    buttonNao.style.width = '150px'
    buttonNao.style.height = '35px'

    div1.appendChild(h4);
    div1.appendChild(buttonClose);

    div2.appendChild(buttonSim)
    div2.appendChild(buttonNao)

    divgeral.appendChild(div1);
    divgeral.appendChild(div2);

    modalbg.style.width = '100vw'
    modalbg.style.height = '100vw'
    modalbg.style.position = 'absolute'
    modalbg.style.backgroundColor = 'rgba(94,94,94,0.4)'
    modalbg.style.display = 'flex'
    modalbg.style.alignItems = 'center'
    modalbg.style.justifyContent = 'center'



    modalbg.appendChild(divgeral)
}

async function remarcarConsulta(id){

}

document.getElementById("filtrar").addEventListener('change', (event) => {
    event.preventDefault();

    let option = document.getElementById("filtrar").value
    if(option == "Todos"){
        montarConsultas(consultas);
    }
    else{
        carregarConsultaPorFiltro(option);
    }
})

document.getElementById("goback").addEventListener('click', (event) => {
    event.preventDefault();

    window.location.assign('./userlogado.html')
})