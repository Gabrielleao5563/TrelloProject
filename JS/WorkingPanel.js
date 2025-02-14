//Variáveis
var ListPresentingMode = 1;

var ListsAmount = 3;
var CardsAmount = 0;
var LabelsAmount = 0;

//Função Responsável por Carregar as listas
function LoadLists(){

    var div = document.getElementById("ListsSeparation");
    var tempcontent = "";
    var loadedlists = 0;

    //Acessa a data a carrega as listas sem organiza-las
    for(i=1;i<=ListsAmount;i++){
        
        //Controla quantos blocos ja foram gerados
        loadedlists++;

        //Gera blocos de listas sem conteúdo enquanto as identifica com um ID
        tempcontent = `
            <!--Lista ${i}-->
            <div draggable="True" Class="List" id="List${i}">
                <!--Cartões da Lista ${i}-->
                <p Class="ListNameText" id="NomeLista${i}">Nome aqui</p>
            </div>
        `

        //insere o bloco na tela
        div.innerHTML=div.innerHTML+tempcontent;
    }

    //Acessa os dados e configura as listas com conteúdo
    fetch('../DATA/Lists.json').then(response => response.json()).then(data => {
        data.forEach(List => {

            //Toma o controle da div a ser configurada no momento
            var focustext = document.getElementById(String("NomeLista" + List.position));

            focustext.innerHTML=List.name;

            //Verifica se está arquivada e decide se exibe ou não
            if(List.archived == 0){
                console.log("Carregamento concluído");
            }else{
                var focusdiv = document.getElementById("List" + List.position)
                focusdiv.style.display="none";
            }

            //Insere o conteúdo

        })
    })
}

//Função responsável por criar uma Lista quando solicitado
function CreateList(){

}

//Função que Faz o Texto Aparecer ou Desapareçer quando o usuário clica em uma etiqueta
function ChangeListPresentingMode(){

    switch(ListPresentingMode){

        case 1:
            ListPresentingMode = 0;
            decision = "none";
            break;
        default:
            ListPresentingMode = 1;
            decision = "initial";
            break;
    }

    for(var i=LabelsAmount; i>0; i--){
        document.getElementById(String("Label" + i)).style.display=decision;
    }
}