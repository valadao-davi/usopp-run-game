const usopp = document.querySelector('.usopp') //cria uma variavel "usopp" e faz ela receber os atributos da classe usopp
const tritao = document.querySelector('.tritao')
let vidas = 5;
let quantidadeBalas


const pulo = () => {
    usopp.classList.add('pulo'); //dentro da variavel usopp, que representa uma classe, adiciona "pulo"

    setTimeout(() => {
        usopp.classList.remove('pulo');
    }, 750); //depois do tempo em milisegundos, remove o pulo para poder executar novamente

}

const loop = setInterval(() => {
    const movimentoTritao = tritao.offsetLeft;
    const usoppY = +window.getComputedStyle(usopp).bottom.replace('px', '')
    tritao.classList.add('movimento_tritao')

    if(movimentoTritao < 170 && usoppY < 50 && movimentoTritao > 0){
        let bateu
        bateu = true
        console.log('bateu')
        tritao.classList.remove('movimento_tritao')
        vidas --
        console.log(vidas)
    } else {
        bateu = false
        quantidadeBalas ++
    }
    if (vidas <= 0) {
        tritao.style.left = `${movimentoTritao}px`;
    }
}, 10)



document.addEventListener('keydown', (event) =>{
    switch (event.key){

    case 'ArrowUp':
    pulo();
    break;

    }
}); //depois do evento, executa a função pulo
