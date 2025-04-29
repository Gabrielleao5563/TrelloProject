//Função que salva dados dentro dos Json
function salvarData(endereco, tipo, dado){

    //Faz uma cópia temporária da planilha referente ao dado
    let planilhaTemporaria = consultarData(endereco);

    //Interpreta qual tipo de arquivo esta sendo salvo
    switch(tipo){

        case "quadro":
            planilhaTemporaria.quadros.push(dado);
            break;

        case "lista":
            planilhaTemporaria.listas.push(dado);
            break;
    }

    //Acessa a planilha original
    localStorage.setItem(endereco, JSON.stringify(planilhaTemporaria)); //Insere os dados lá dentro
    console.log("Dados salvos em " + endereco.toUpperCase() + "!"); //Registra que os dados foram salvos

}