//Detecta e expulsa usuario que entrar na página sem ter um quadro criado e ativo
function bloquearusosemquadro(){
    
    let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello")); //Acessa o arquivo JSON
    let quadroatual = localStorage.getItem("quadroatual"); //Procura saber se tem um quadro aberto

    //Verifica se existe algum quadro criado
    let existequadro = dadosdotrello && dadosdotrello.quadros && dadosdotrello.quadros.length > 0;


    //Caso não exista, redireciona o usuario
    if(!existequadro || !quadroatual){
        window.location.href = "Boards.html";
    }

}