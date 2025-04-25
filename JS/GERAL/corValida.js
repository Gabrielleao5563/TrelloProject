//Função que verifica se uma cor está no formato aceito pelo CSS
function corvalida(color){

    //Verifica se a cor se encaixa no formato Hexadecimal
    let padraohex = /^#([0-9A-Fa-f]{3}){1,2}$/;
    if(padraohex.test(color)) return true;

    //Verifica se a cor se encaixa no formato RGB ou RGBA
    let padraorgb = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(\s*,\s*(0|0?\.\d+|1))?\s*\)$/;
    if(padraorgb.test(color)) return true;

    //Verifica se a cor se encaixa como nome em ingles
    let elementotemporario = document.createElement("div");
    elementotemporario.style.color = color;
    if(elementotemporario.style.color !== "") return true;

    //Se não passar em nenhum, finalizar com erro
    return false;

}