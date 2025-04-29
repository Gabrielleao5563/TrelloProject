//Trata os dados e prossegue com a criação da lista
function comecarcriacaodalista(){

    //Consulta qual o quadro ativo
    var quadroid = consultarquadroatual();

    //Pega o nome digitado na caixa de texto
    var listanome = document.getElementById("ListCreationTabInput").value;

    //Verifica se foi digitado algo no campo do nome
    if(listanome === ""){

        //Se nada foi digitado, auto nomear
        listanome = "Lista sem nome";

    }

    //Caso não tenha quadro ativo
    if(!quadroid){
        
        return; //Encerrar criação da lista

    }
    
    let listasdessequadro = consultarData("dadosdotrello").listas.filter(lista => lista.boardid === quadroid); //Filtra apenas as listas referentes a esse quadro

    var posicao = listasdessequadro.length + 1; //Decide a posição ideal para a lista
    
    criarumalista(quadroid, listanome, posicao); //Chama a função para salvar

    var nomeinput = document.getElementById("ListCreationTabInput"); //Pega acesso ao input
    nomeinput.value=""; //Limpa o campo de digitação após criar

    fecharjanela('ListCreationTab');

}

//Funcao responsável por criar uma nova lista
function criarumalista(boardid, name, position){

    let dadosdotrello = consultarData("dadosdotrello"); //Pega todos os dados já salvos no cache do site sobre as listas e cartoes

    //Criação de uma nova lista
    let novalista = {
        id: Date.now(), //Insere o ID da lista como sendo a data de criação
        boardid: boardid, //Associa a lista ao quadro onde ela foi gerada
        name: name, //Insere o nome da lista como o nome digitado pelo usuario
        position: position, //Armazena a atual posição da lista
        cardcount: 0 //Consta quantos cartões estão salvos dentro desta lista
    }

    salvarData("dadosdotrello", "lista", novalista); //Chama a função que vai salvar os dados

    carregarlistas(); //Recarrega as listas existentes
}