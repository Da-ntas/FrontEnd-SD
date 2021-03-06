let codeUser = window.sessionStorage.getItem("userCode");
let codMedico = window.sessionStorage.getItem("codMed");
let allconsultas;

if(!codMedico){
    allconsultas = fetch(`http://localhost:8080/consultas/userConsultas/${codeUser}`).then((response) => {return (response)})
}
else{
    allconsultas = fetch(`http://localhost:8080/consultas/medico/${codMedico}`).then((response) => {return (response)})
    document.getElementById("filtrar").style.display = "hidden"
}
let consultas;
let arrConsultas = [];
let arrObj = [];
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

    if(consultas.length == 0){
        let text = document.createTextNode("Nenhuma consulta encontrada :(")

        cardconsultas.appendChild(text)
    }

    await Promise.all(consultas.map(async (infoConsulta) => {

        let infos = await (getInfos(infoConsulta.idUnidadeAgendado, infoConsulta.idTipoExame, infoConsulta.codMedidoAgendado))
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
        let textEndereco = document.createTextNode(`Endere??o agendado: ${infos.enderecoUnidade}`);
        let textTipoExame = document.createTextNode(`Tipo de exame: ${infos.nomTipoExame}`);
        let textNomMedico = document.createTextNode(`Nome do m??dico: ${infos.nomMedico}`);

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

    

        if(infoConsulta.statusConsulta === "Agendada" || infoConsulta.statusConsulta === "Remarcada"){
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
        window.alert("O resultado dessa consulta ainda n??o est?? dispo??nivel");
    }
}

function fecharModal(){
    let modalbg = document.getElementById("modal");

    modalbg.innerHTML = ''
    modalbg.style.display = 'none'

}

async function desmarcarConsulta(id){
    fetch(`http://localhost:8080/consultas/status/${id}?newStatus=Desmarcada`, {method: 'PUT'}).then((response) => {return (response)})

    location.reload();
    
}

function montarModalDesmarcarConsulta(id){
    let modalbg = document.getElementById("modal");
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

    buttonSim.className = "yesbutton"
    buttonNao.className = "nobutton"

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
    buttonClose.style.width = '20px'
    buttonClose.style.height = '20px'
    // buttonClose.style.borderRadius = '10px'
    buttonClose.style.textAlign = 'center'
    buttonClose.setAttribute("onclick", `fecharModal()`)

    buttonSim.setAttribute("value", "Sim")
    buttonSim.setAttribute("onclick", `desmarcarConsulta(${id})`)

    buttonNao.setAttribute("value", "N??o")
    buttonNao.setAttribute("onclick", `fecharModal()`)

    buttonSim.style.backgroundColor = 'lightgrey'
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

    modalbg.style.width = 'inherit'
    modalbg.style.height = '100vh'
    modalbg.style.position = 'fixed'
    modalbg.style.top = '0px'
    modalbg.style.backgroundColor = 'rgba(94,94,94,0.4)'
    modalbg.style.display = 'flex'
    modalbg.style.alignItems = 'center'
    modalbg.style.justifyContent = 'center'



    modalbg.appendChild(divgeral)
}

function adicionaOpcoes(data){
    let arrData = ['10/06/2022', '13/06/2022', '14/06/2022', '15/06/2022', '16/06/2022', '17/06/2022', '20/06/2022', '21/06/2022']
    let arrHoras = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']

    let indexData = arrData.indexOf(data);

    let arrDataFormatado = arrData.slice(indexData + 1);

    let selectData = document.getElementById("selectData");
    let selectHora = document.getElementById("selectHora");

    arrDataFormatado.forEach(element => {
        let options = document.createElement("option")
        options.value = element;
        options.text = element;

        selectData.add(options);
    });

    arrHoras.forEach(element => {
        let options = document.createElement("option")
        options.value = element;
        options.text = element;

        selectHora.add(options);
    });

}

async function atualizarConsulta(id){
    let data = document.getElementById("selectData").value;
    let hora = document.getElementById("selectHora").value;
    await fetch(`http://localhost:8080/consultas/remarcar/${id}?newData=${data}&newHour=${hora}&newStatus=Remarcada`, {method: 'PUT'})

    location.reload();
}

async function remarcarConsulta(id){
    let options = arrObj.find(ops => ops.consulta == id)

    let modalbg = document.getElementById("modal");
    let divgeral = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let div4 = document.createElement("div");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let span3 = document.createElement("span");
    let span4 = document.createElement("span");
    let h4 = document.createElement("h4");
    let selectData = document.createElement("select");
    let selectHora = document.createElement("select");
    let buttonClose = document.createElement("button");
    let buttonRemarcar = document.createElement("button");

    let textOldData = document.createTextNode(`Data antiga: ${options.data}`);
    let textOldHora = document.createTextNode(`Data antiga: ${options.hora}`);
    let textData = document.createTextNode(`Selecionar nova data`)
    let textHora = document.createTextNode(`Selecionar novo hor??rio`)

    divgeral.style.width = '500px'
    divgeral.style.height = '250px'
    divgeral.style.backgroundColor = 'white'

    selectData.id = "selectData"
    selectHora.id = "selectHora"
    buttonRemarcar.className = "buttonRemarcar"

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

    div3.style.width = 'inherit'
    div3.style.height = '50px'
    div3.style.display = 'flex'
    div3.style.alignItems = 'center'
    div3.style.justifyContent = 'space-evenly'
    
    div4.style.width = 'inherit'
    div4.style.height = '50'
    div4.style.display = 'flex'
    div4.style.alignItems = 'center'
    div4.style.justifyContent = 'space-evenly'

    span1.style.width = '100%'
    span1.style.height = '100px';
    span2.style.width = '100%'
    span2.style.height = '100px';
    span1.style.display = 'flex'
    span1.style.alignItems = 'center'
    span1.style.justifyContent = 'center'
    span2.style.display = 'flex'
    span2.style.alignItems = 'center'
    span2.style.justifyContent = 'center'
    span3.style.display = 'flex'
    span3.style.alignItems = 'center'
    span3.style.justifyContent = 'center'
    span3.style.flexDirection = 'column'
    span4.style.display = 'flex'
    span4.style.alignItems = 'center'
    span4.style.justifyContent = 'center'
    span4.style.flexDirection = 'column'
    
    buttonClose.textContent = 'X'
    buttonRemarcar.textContent = 'Remarcar'
    h4.textContent = 'Deseja desmarcar essa consulta?'
    
    buttonClose.style.marginLeft = '70px'
    buttonClose.style.width = '20px'
    buttonClose.style.height = '20px'
    buttonRemarcar.style.width = '120px'
    buttonRemarcar.style.height = '25px'
    buttonRemarcar.setAttribute("onclick", `atualizarConsulta(${id})`)
    // buttonClose.style.borderRadius = '10px'
    buttonClose.style.textAlign = 'center'
    buttonClose.setAttribute("onclick", `fecharModal()`)

    buttonRemarcar.style.color = 'white'
    selectData.style.backgroundColor = 'lightgrey'
    selectData.style.width = '150px'
    selectData.style.height = '35px'
    selectHora.style.backgroundColor = 'lightgrey'
    selectHora.style.width = '150px'
    selectHora.style.height = '35px'

    span1.appendChild(textOldData);
    span2.appendChild(textOldHora);

    span3.appendChild(textData);
    span3.appendChild(selectData);

    span4.appendChild(textHora);
    span4.appendChild(selectHora);

    div1.appendChild(h4);
    div1.appendChild(buttonClose);

    div2.appendChild(span3)
    div2.appendChild(span4)

    div3.appendChild(span1);
    div3.appendChild(span2);

    div4.appendChild(buttonRemarcar)

    divgeral.appendChild(div1);
    divgeral.appendChild(div3);
    divgeral.appendChild(div2);
    divgeral.appendChild(div4);

    modalbg.style.width = 'inherit'
    modalbg.style.height = '100vh'
    modalbg.style.position = 'fixed'
    modalbg.style.top = '0px'
    modalbg.style.backgroundColor = 'rgba(94,94,94,0.4)'
    modalbg.style.display = 'flex'
    modalbg.style.alignItems = 'center'
    modalbg.style.justifyContent = 'center'

    modalbg.appendChild(divgeral)

    adicionaOpcoes(options.data);

}

document.getElementById("filtrar").addEventListener('change', (event) => {
    event.preventDefault();

    let option = document.getElementById("filtrar").value
    if(option == "Todas"){
        montarConsultas(consultas);
    }
    else{
        let filteredConsultas = consultas.filter((e) => e.statusConsulta == option)
        montarConsultas(filteredConsultas);
    }
})

document.getElementById("goback").addEventListener('click', (event) => {
    event.preventDefault();

    if(window.sessionStorage.getItem("codMed")){
        window.location.assign('./medicologado.html');   
    }
    else{
        window.location.assign('./userlogado.html');
    }
})

document.getElementById("cardsConsultas").addEventListener('click', (event) => {
    event.preventDefault();
    
    omitirAction();
})

document.getElementById("topoOps").addEventListener('click', (event) => {
    event.preventDefault();
    
    omitirAction();
})