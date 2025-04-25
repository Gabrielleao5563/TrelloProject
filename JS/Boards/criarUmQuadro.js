//Função para abrir ou fechar a janela de criação de quadro
function janeladecriacaodequadro(decision){

    //Acessa a div responsável pela janela de criação do quadro e faz a alteração
    var div = document.getElementById("BoardCreationTab").style.display=decision;

}

//Função que trata os dados e inicia criação do quadro
function iniciarcriacaodoquadro(){

    //Acessa caixas de erro
    var caixaerro1 = document.getElementById("boardcreationtaberror1");
    var caixaerro2 = document.getElementById("boardcreationtaberror2");

    //Acessa os textos das caixas de erro
    var erro1 = document.getElementById("boardcreationtaberror1text");
    var erro2 = document.getElementById("boardcreationtaberror2text");

    //Reseta caixas de erro antes de iniciar o processo de verificação
    caixaerro1.style.display="none";
    caixaerro2.style.display="none";

    //Acessa os campos de digitação e pega as informações digitadas
    var nomedigitado = document.getElementById("boardcreationinput1");
    var corinserida = document.getElementById("boardcreationinput2");

    //---------- VERIFICAÇÔES ---------- VERIFICAÇÔES ---------- VERIFICAÇÔES ---------- VERIFICAÇÔES ---------- VERIFICAÇÔES ---------- VERIFICAÇÔES ---------- VERIFICAÇÔES

    //Se não houver nome digitado
    if(nomedigitado.value == ""){

        //Mostrar o seguinte erro
        erro1.innerHTML="Nenhum nome foi digitado para a lista!";
        caixaerro1.style.display="flex";

        //Cancelar criação do quadro
        return;
    }

    //Se não houver cor inserida/digitada
    if(corinserida.value == ""){

        //Mostrar o seguinte erro
        erro2.innerHTML="Nenhuma cor foi inserida para o plano de fundo!";
        caixaerro2.style.display="flex";

        //Cancelar criação do quadro
        return;
    }

    //Verifica se a cor inserida é valida
    if(!corvalida(corinserida.value)){

        //Exibir mensagem de erro
        erro2.innerHTML="Somente é aceito no formato inglês, hexadecimal ou rgb!";
        caixaerro2.style.display = "flex";

        //Cancelar criação do quadro
        return;

    }

    //Fecha a janela
    janeladecriacaodequadro('none')

    //Salva o quadro
    criarumquadro(nomedigitado.value, corinserida.value);

}

//Função responsável por criar um novo quadro
function criarumquadro(name, background){

    let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello")); //Puxa os dados do arquivo JSON

    //Assegura que um quadro com dados nulos não seja criado
    if(!name || !background){

        //Caso existam dados nulos, cancelar criação do quadro;
        console.log("Foram encontrados dados inválidos na criação do Quadro. Operação cancelada");
        return;

    }

    //Criação do novo quadro
    let novoquadro = {

        id: Date.now(), //ID gerado com base na data de criação
        name: name, //Nome inserido pelo usuário
        background: background //Imagem escolhida pelo usuário

    }

    console.log("Criando quadro: ", novoquadro.name, " Id: ", novoquadro.id, " Cor de fundo: ", novoquadro.background); //Registra no console

    //Salva o novo quadro no arquivo JSON
    dadosdotrello.quadros.push(novoquadro); 
    localStorage.setItem("dadosdotrello", JSON.stringify(dadosdotrello));

    //Recarrega os quadros após criar
    carregarquadros();

}