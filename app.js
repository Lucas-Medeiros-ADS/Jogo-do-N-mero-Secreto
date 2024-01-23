let listaDeNúmerosSorteados = [];
let númeroLimite = 10;
let númeroSecreto = gerarNúmeroAleatório();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2})
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == númeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > númeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    } 
}

function gerarNúmeroAleatório(){
    let númeroEscolhido = parseInt(Math.random() * númeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNúmerosSorteados.length;

    if (quantidadeDeElementosNaLista == númeroLimite) {
        listaDeNúmerosSorteados = [];
    }
    if(listaDeNúmerosSorteados.includes(númeroEscolhido)){
        return gerarNúmeroAleatório();
    } else {
        listaDeNúmerosSorteados.push(númeroEscolhido);
        console.log(listaDeNúmerosSorteados)
        return númeroEscolhido
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {  
    númeroSecreto = gerarNúmeroAleatório();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}