//Abre o menu flutuante da lista
function abrirmenuflutuantedalista(listaid, event) {
    //Previne mau uso do botão
    event.preventDefault();

    //Acessa a div do menu
    const divdomenu = document.getElementById("floatinglistmenudiv");

    // Se clicando no mesmo botao de novo, mantem aberto
    if (divdomenu.style.display === "block") {
        fecharmenulista(); // Close first
    }

    // Gera as opções do menu dinamicamente
    divdomenu.innerHTML = `
        <ul>
            <li onclick="iniciartrocadenomelista(${listaid}, 'ListaNome${listaid}', 'ListaInput${listaid}'); fecharmenulista()">Renomear lista</li>
            <li onclick="fecharmenulista()">Excluir lista</li>
        </ul>
    `;

    // Pega a posição do cursor
    const x = event.pageX;
    const y = event.pageY;

    // Posiciona o menu
    divdomenu.style.left = `${x}px`;
    divdomenu.style.top = `${y}px`;
    divdomenu.style.display = "block";

    // Apenas fecha o menu ao clicar fora
    setTimeout(() => {
        document.addEventListener("click", fecharmenulista);
    }, 100);
}

function fecharmenulista(event) {
    const divdomenu = document.getElementById("floatinglistmenudiv");

    // Não fazer nada se o clique for dentro do menu ou do botão
    if (event && (divdomenu.contains(event.target) || event.target.closest(".FixedListTreePointBTN"))) {
        return;
    }

    //Oculta o menu e reseta a função
    divdomenu.style.display = "none";
    document.removeEventListener("click", fecharmenulista);
}