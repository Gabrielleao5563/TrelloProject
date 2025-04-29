//Dados iniciais para novos acessos
const datapadrao = {
    quadros: [], //Variavel que vai guardar todos os quadros
    listas: [], //Variavel que vai guardar todas as listas
    cartoes: [] //Variavel que vai guardar todos os cartoes e seus dados
}

//Função que verifica se ja existe um arquivo JSON local
function verificarjson(){

    //Se o arquivo nao existir
    if(!localStorage.getItem("dadosdotrello")){

        //Criar o arquivo e inserir os dados padrao
        localStorage.setItem("dadosdotrello", JSON.stringify(datapadrao));
        console.log("Arquivo JSON criado");
    }else{
        return;
    }
}