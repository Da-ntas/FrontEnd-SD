function carregarForm(){
    
    document.getElementById("login").style.display = "block"
}

document.getElementById("change").addEventListener('click', async (event) => {
    event.preventDefault();
    let codUser = Number(window.sessionStorage.getItem("userCode"))
    let oldPass = document.getElementById("oldPassword").value;
    let newPass = document.getElementById("newPassword").value;

    if(oldPass != newPass){
        let userGet = fetch(`http://localhost:8080/user/${codUser}`)
        .then((response) => {
            return (response)
        })
        .catch((error) => {
            console.log(error)
        })

        let getStatus = await userGet
        if(getStatus.status == 404){
            window.alert("Favor verificar suas credenciais");
        }
        else{
            let user = await (await userGet).json();
            console.log(user);
            if(user.password == oldPass){
                fetch(`http://localhost:8080/user/${codUser}?newPass=${newPass}`, {
                    method: "PUT"
                })
                .then((response) => {
                    window.alert("Senha alterada com sucesso!");
                    document.getElementById("formlogin").reset();
                })
            }
            else{
                window.alert("A senha antiga não coincide");
            }
        }
    }
    else{
        window.alert("As senhas precisam ser diferentes");
    }
})