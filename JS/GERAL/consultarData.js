//Função responsável por consultar os dados salvos em um JSON
function consultarData(endereco){

    //Variável que vai consultar os dados e armazena-los
    let dados = JSON.parse(localStorage.getItem(String(endereco)));

    //Cataloga que os dados foram consultados
    console.log("Consultando planilha " + endereco.toUpperCase() + "!");

    //Envia os dados encontrados para o carregamento
    return dados;

}