function resultadoConsultafunc(){
    let sessionResult = JSON.parse(window.sessionStorage.getItem('infosconsulta')) 
    let consulta = sessionResult.opt.consulta
    let information = sessionResult.opt.informations
    let resultConsulta = sessionResult.reslt

    let descricao = document.getElementById("descricao")
    let solicitacoes = document.getElementById("solicitacoes")
    let unidade = document.getElementById("unidadeSpec")
    let tipoExame = document.getElementById("tipoExamInfo")
    let medico = document.getElementById("medicoInfo")
    let dataAgendada = document.getElementById("dataInfo")
    let horarioAgendado = document.getElementById("horarioInfo")

    descricao.innerText = resultConsulta.descricao
    solicitacoes.innerText = resultConsulta.solicitacoes
    unidade.innerText = information.nomUnidade
    tipoExame.innerText = information.nomTipoExame
    medico.innerText = information.nomMedico
    dataAgendada.innerText = consulta.dtaAgendada
    horarioAgendado.innerText = consulta.horarioAgendado
}


document.getElementById("goback").addEventListener('click', (event) => {
    event.preventDefault();

    window.sessionStorage.removeItem('infosconsulta');
    window.location.assign('./historicodeConsultas.html')
})