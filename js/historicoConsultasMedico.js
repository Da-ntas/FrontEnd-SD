let codMed = window.sessionStorage.getItem("codMed");

let allconsultas = fetch(`http://localhost:8080/consultas/${codMed}`).then((response) => {return (response)})
let consultas;
let arrConsultas = [];
// let tipoExame = 
// let unidadeAgendada = 


async function carregarConsultas() {
    consultas = await (await allconsultas).json()
    console.log(consultas)
    let body = document.body;

    // await Promise.all(consultas.map(async (infoConsulta) => {

    //     let infos = await (getInfos(infoConsulta.idUnidadeAgendado, infoConsulta.idTipoExame, infoConsulta.codMedidoAgendado))
    //     arrConsultas.push({
    //         consulta: infoConsulta,
    //         informations: infos
    //     })
        
    //     let divCard = document.createElement("div");
    //     let divSuperior = document.createElement("div");
    //     let divInferior = document.createElement("div");
    //     let spanSuperior1 = document.createElement("span");
    //     let spanSuperior2 = document.createElement("span");
    //     let spanInferior1 = document.createElement("span");
    //     let spanInferior2 = document.createElement("span");
    //     let inputResult = document.createElement("input");
    //     let p1 = document.createElement("p");
    //     let p2 = document.createElement("p");
    //     let p3 = document.createElement("p");
    //     let p4 = document.createElement("p");
    //     let p5 = document.createElement("p");
    //     let p6 = document.createElement("p");
    //     let p7 = document.createElement("p");

    //     let textStatus = document.createTextNode(`Status: ${infoConsulta.statusConsulta}`);
    //     let textData = document.createTextNode(`Data Agendada: ${infoConsulta.dtaAgendada}`);
    //     let textHorario = document.createTextNode(`Horario agendado: ${infoConsulta.horarioAgendado}`);
    //     let textUnidade = document.createTextNode(`Unidade agendada: ${infos.nomUnidade}`);
    //     let textEndereco = document.createTextNode(`Endereço agendado: ${infos.enderecoUnidade}`);
    //     let textTipoExame = document.createTextNode(`Tipo de exame: ${infos.nomTipoExame}`);
    //     let textNomMedico = document.createTextNode(`Nome do médico: ${infos.nomMedico}`);

    //     divCard.className = "card"
    //     divSuperior.className = "superior"
    //     divInferior.className = "inferior"
    //     spanSuperior1.className = "dateHour"
    //     spanSuperior2.className = "unidadeInfo"
    //     spanInferior1.className = "exameMedico"
    //     spanInferior2.className = "inputResultado"
    //     inputResult.className = "botaoPesquisar"

    //     inputResult.setAttribute("onclick", `loadResultConsulta(${infoConsulta.codeConsultas})`)
    //     inputResult.setAttribute("type", "button")
    //     inputResult.setAttribute("value", "Resultado")
    
    //     p1.appendChild(textStatus)
    //     p2.appendChild(textData)
    //     p3.appendChild(textHorario)
    //     p4.appendChild(textUnidade)
    //     p5.appendChild(textEndereco)
    //     p6.appendChild(textTipoExame)
    //     p7.appendChild(textNomMedico)
    //     ///resultadoconsulta/consulta
    //     spanSuperior1.appendChild(p1)
    //     spanSuperior1.appendChild(p2)
    //     spanSuperior1.appendChild(p3)
    //     spanSuperior2.appendChild(p4)
    //     spanSuperior2.appendChild(p5)
    //     spanInferior1.appendChild(p6)
    //     spanInferior1.appendChild(p7)
    //     spanInferior2.appendChild(inputResult)
        
    //     divSuperior.appendChild(spanSuperior1)
    //     divSuperior.appendChild(spanSuperior2)
    //     divInferior.appendChild(spanInferior1)
    //     divInferior.appendChild(spanInferior2)
    //     divCard.appendChild(divSuperior)
    //     divCard.appendChild(divInferior)

    //     body.appendChild(divCard)

    // }))
    
}

// async function loadResultConsulta(id){
//     let resultadoConsultaInfo = await fetch(`http://localhost:8080/resultadoconsulta/consulta/${id}`)
//     let resultadoConsulta = await (await resultadoConsultaInfo).json();
    
//     if(resultadoConsultaInfo.status != 404){

//         let options = arrConsultas.find(ops => ops.consulta.codeConsultas == id)

//         let objinfos = {
//             opt: options,
//             reslt: resultadoConsulta
//         }
//         let txtopts = JSON.stringify(objinfos)

//         window.sessionStorage.setItem('infosconsulta', txtopts)
//         window.location.assign('./resultadoConsulta.html');
//     }
//     else{
//         window.alert("O resultado dessa consulta ainda não está dispoínivel");
//     }
// }

document.getElementById("goback").addEventListener('click', (event) => {
    event.preventDefault();

    window.location.assign('./medicologado.html')
})