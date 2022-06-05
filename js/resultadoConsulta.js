function resultadoConsultafunc(){
    let sessionResult = JSON.parse(window.sessionStorage.getItem('infosconsulta')) 
    // let consulta = sessionResult.opt.consulta
    // let information = sessionResult.opt.informations
    let resultConsulta = sessionResult.reslt

    let descricao = document.getElementById("descricao")
    let solicitacoes = document.getElementById("solicitacoes")

    descricao.innerText = resultConsulta.descricao
    solicitacoes.innerText = resultConsulta.solicitacoes
}


document.getElementById("voltar").addEventListener('click', (event) => {
    event.preventDefault();

    window.sessionStorage.removeItem('infosconsulta');
    window.location.assign('./historicodeConsultas.html')
})