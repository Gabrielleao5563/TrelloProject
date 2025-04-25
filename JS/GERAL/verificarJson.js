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
        //Caso arquivo já existir, nao fazer nada
        console.log("Arquivo JSON já existe");
    }
}

let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello")); //Puxa os dados atuais do arquivo JSON e insere para ser usado no código
console.log("Dados encontrados no arquivo JSON ao carregar: " + dadosdotrello); //Registra o que foi encontrado no arquivo JSON para o console