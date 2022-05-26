let codeCidade = window.sessionStorage.getItem("userCidade")
let allunidades = fetch(`http://localhost:8080/unidades/cidades/${codeCidade}`).then((response) => {return (response)})
let unidades;
async function agendamentoConsultas(){
    unidades = await (await allunidades).json();
    let unidadeAgendado = document.getElementById("unidadeAgendado");

    unidades.forEach(element => {
        let optionUnidade = document.createElement("option")
        
        let nomUnidade = element.nomUnidade;
        let codUnidade = element.codeUnidades;
        optionUnidade.value = codUnidade;
        optionUnidade.text = nomUnidade;

        unidadeAgendado.add(optionUnidade)
    });
}


document.getElementById("unidadeAgendado").addEventListener("change", async (event) => {
    event.preventDefault();

    let enderecoAgendado = document.getElementById("enderecoAgendado");
    let unidade = document.getElementById("unidadeAgendado").value;

    unidades.forEach(element => {
        if(element.codeUnidades == unidade){
            let optionEndereco = document.createElement("option")

            let nomEmdereco = element.enderecoUnidade;
            let codUnidade = element.codUnidades;
            optionEndereco.value = codUnidade;
            optionEndereco.text = nomEmdereco;
            optionEndereco.setAttribute("selected", "selected")
            optionEndereco.setAttribute("disabled", "disabled")

            enderecoAgendado.add(optionEndereco);
        }
    })
    


})

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