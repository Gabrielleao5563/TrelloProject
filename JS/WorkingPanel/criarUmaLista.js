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

        //Encerrar criação da lista
        return;

    }

    //Filtra apenas as listas referentes a esse quadro
    let listasdessequadro = dadosdotrello.listas.filter(lista => lista.boardid === quadroid);

    //Decide a posição ideal para a lista
    var posicao = listasdessequadro.length + 1;

    //Chama a função para salvar
    criarumalista(quadroid, listanome, posicao);

    //Pega acesso ao input
    var nomeinput = document.getElementById("ListCreationTabInput");

    //Limpa o campo de digitação após criar
    nomeinput.value="";

    fecharjanela('ListCreationTab');

}

//Funcao responsável por criar uma nova lista
function criarumalista(boardid, name, position){

    //Pega todos os dados já salvos no cache do site sobre as listas e cartoes
    let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello"));

    //Criação de uma nova lista
    let novalista = {
        id: Date.now(), //Insere o ID da lista como sendo a data de criação
        boardid: boardid, //Associa a lista ao quadro onde ela foi gerada
        name: name, //Insere o nome da lista como o nome digitado pelo usuario
        position: position, //Armazena a atual posição da lista
        cardcount: 0 //Consta quantos cartões estão salvos dentro desta lista
    }

    //Insere estes dados dentro da seção listas no arquivo JSON temporario
    dadosdotrello.listas.push(novalista);

    //Passa os dados para o JSON permanente
    localStorage.setItem("dadosdotrello", JSON.stringify(dadosdotrello));
    console.log("Lista adicionada: " + novalista);

    //Recarrega as listas existentes
    carregarlistas();
}