const usopp = document.querySelector('.usopp') //cria uma variavel "usopp" e faz ela receber os atributos da classe usopp
const tritao = document.querySelector('.tritao')
const tela = document.querySelector('.tela')
const telaWidth = tela.clientWidth
const telaHeight = tela.clientHeight
let podeAtirar = true
let tiroDisponivel
let vidas
let quantidadeBalas
let perdeu = false
let vida1 = document.querySelector("#vida1")
let vida2 = document.querySelector("#vida2")
let vida3 = document.querySelector("#vida3")
let vida4 = document.querySelector("#vida4")
let vida5 = document.querySelector("#vida5")
const municao = document.querySelector('.municao')
const estilingue = document.querySelector('.estilingue')
const atingidos = document.querySelector('.alvosAtingidos')
let tipoTritao
let movimentoTritao
let movimentoEstilingue
const Musiquinha = new Audio ('./audios/audioBackground.mp3')
const somTiro = new Audio ('./audios/tiro-som.mp3')
const somAcerto = new Audio ('./audios/tiro-quando-acerta.mp3')
const hit1 = new Audio ('./audios/hit_sound1.mp3')
const hit2 = new Audio ('./audios/hit_sound2.mp3')
const hit3 = new Audio ('./audios/hit_sound3.mp3')
const hit4 = new Audio ('./audios/hit_sound4.mp3')
const som_pulo = new Audio ('./audios/jump_sound.mp3')
const som_morte = new Audio ('./audios/death_sound.mp3')
const pegandoItem = new Audio ('./audios/pegandoMunicao.mp3')

let tritaoMatados = 0
atingidos.textContent = `${tritaoMatados}`

usopp.src = './images/usopp_pose.png'

const pulo = () => {
    if (!perdeu){
    usopp.classList.add('pulo'); //dentro da variavel usopp, que representa uma classe, adiciona "pulo"
    usopp.src = './images/pulo.png'
    som_pulo.play()
    setTimeout(() => {
        usopp.classList.remove('pulo');
        if(!perdeu){
        usopp.src = './images/usopp_run.gif'
        }
    }, 750); //depois do tempo em milisegundos, remove o pulo para poder executar novamente
}}

function iniciarJogo() {
    tritaoMatados = 0
    atingidos.textContent = `${tritaoMatados}`
    Musiquinha.play()
    Musiquinha.loop = true;
    Musiquinha.volume = 0.4
    usopp.src = './images/usopp_run.gif'
    usopp.style.bottom = `0px`;
    vidas = 5
    tritao.classList.remove('movimento_tritao')
    estilingue.classList.remove('movimento_estilingue')
    usopp.classList.remove('usopp_abatido')
    quantidadeBalas = 3
    loop = true
    perdeu = false
    municao.textContent = `${quantidadeBalas}`
    vida1.src = "./images/vida_cheia.webp"
    vida2.src = "./images/vida_cheia.webp"
    vida3.src = "./images/vida_cheia.webp"
    vida4.src = "./images/vida_cheia.webp"
    vida5.src = "./images/vida_cheia.webp"
    tipoTritao = 0

    SpawnIstilingue = setInterval(()=> {
        
        let movimentoEstilingue = estilingue.offsetLeft
        estilingue.classList.add('movimento_estilingue')
        if(movimentoEstilingue < -30) {
            estilingue.style.bottom = Math.random() * 180 + 'px'
        }
        const usoppHitbox = usopp.getBoundingClientRect();
        const estilingueHitbox = estilingue.getBoundingClientRect();
        if (
            estilingueHitbox.left <  usoppHitbox.right &&
            estilingueHitbox.right >  usoppHitbox.left &&
            estilingueHitbox.top < usoppHitbox.bottom &&
            estilingueHitbox.bottom > usoppHitbox.top
        ) {
            quantidadeBalas += 3
            municao.textContent = `${quantidadeBalas}`
            pegandoItem.play()
            estilingue.classList.remove('movimento_estilingue')
            estilingue.style.display = 'none'
            setTimeout(()=> {
                estilingue.classList.add('movimento_estilingue')
                estilingue.style.display = 'block'
            }, 10000)
                
    
        }                   
    }, 10)

    loop = setInterval(() => {
        let movimentoTritao = tritao.offsetLeft;
        const usoppY = +window.getComputedStyle(usopp).bottom.replace('px', '')
        tritao.classList.add('movimento_tritao')
        municao.textContent = `${quantidadeBalas}`
        movimentoEstilingue = estilingue.offsetLeft


        if(movimentoTritao < 180 && usoppY < 60 && movimentoTritao > 0){
            tritao.classList.remove('movimento_tritao')
            vidas --
            if(vidas == 4 || vidas == 1){
                hit1.play()
            } else if (vidas == 3) {
                hit4.play()
            } else if (vidas == 2) {
                hit2.play()
            } else if (vidas == 0) {

            }
            usopp.classList.add('hit')
            usopp.style.bottom = `${usoppY}px`;
            tipoTritao ++
            console.log(tipoTritao)
            setTimeout(() => {
                usopp.classList.remove('hit');
                usopp.style.bottom = `0px`;

            }, 750);
            
        }

        /*
        if (movimentoTritao < 180 && usoppY > 60 && movimentoTritao > 0) {
            quantidadeBalas ++
        }
        */
        if(tritaoMatados >= 4) {
            tritaoMatados --
            tritaoMatados = 0
        }
        if (vidas <= 0) {
            clearInterval(loop)
            tritao.style.left = `${movimentoTritao}px`;
            usopp.src = "/images/usopp_bateu.png"
            usopp.classList.add('usopp_abatido')
            usopp.style.bottom = `${usoppY}px`;
            usopp.classList.remove('pulo');
            usopp.classList.remove('hit');
            perdeu = true
            vida1.src = "./images/vida_perdida.png"
            clearInterval(SpawnIstilingue)
            estilingue.style.left = `${movimentoEstilingue}px`
            console.log(movimentoEstilingue)
            som_morte.play()
            return tipoTritao
            
    
        }
        
        if (tipoTritao >= 5){
            tipoTritao = 0
        }
        
        switch (tipoTritao){

                case 4:
                tritao.src = "./images/tritao 5.png"
                break;
            
                case 3:
                tritao.src = "./images/tritao 4.png"
                break;
            
                case 2:
                tritao.src = "./images/tritao 3.png"
                break;
            
                case 1:
                tritao.src = "./images/tritao 2.png"
                break;
            
                case 0:
                tritao.src = "./images/tritao 1.png"
                break;
                } 
                
        switch (vidas){

            case 4:
                vida5.src = "./images/vida_perdida.png"
                
                break;
                    
                case 3:
                vida4.src = "./images/vida_perdida.png"
                break;
                    
                case 2:
                vida3.src = "./images/vida_perdida.png"
                break;
                    
                case 1:
                vida2.src = "./images/vida_perdida.png"
                break;
                    
                case 0:
                vida1.src = "./images/vida_perdida.png"
                break;
                } 
                if (movimentoTritao < -40){
                    tipoTritao ++
                }
    }, 10)
}



function atirar() {
    if (podeAtirar == true && quantidadeBalas > 0 && !perdeu){
        tiroDisponivel = true;
    } else {
        tiroDisponivel = false;
    }
    if (!tiroDisponivel) {
        return
    }
    usopp.src = './images/novo_tiro.gif'
    podeAtirar = false
    setTimeout(() => {
        if(!perdeu){
        usopp.src = './images/usopp_run.gif';
        }
        podeAtirar = true
    }, 300); 
    const tiro = document.createElement('div')
    tiro.classList.add('tiro')
    tiro.id = 'tiro'
    tela.appendChild(tiro)
    quantidadeBalas --
    somTiro.play()

    const usoppHitbox = usopp.getBoundingClientRect()
    tiro.style.left = (usoppHitbox.width + usoppHitbox.width) + 'px'
    tiro.style.top = (telaHeight - usoppHitbox.height) + 'px'
    console.log(tiro.style.top)
    console.log(usoppHitbox)
    const loopTiros = setInterval(() => {
        const tiroColisao = tiro.getBoundingClientRect();
        const colisaoTritao = tritao.getBoundingClientRect();

        if(tiroColisao.right < window.innerWidth) {
            tiro.style.left = (parseInt(tiro.style.left) || 0) + 10 + 'px'
        } else {
            clearInterval(loopTiros)
            tela.removeChild(tiro)

        }

        if (
            tiroColisao.left <  colisaoTritao.right &&
            tiroColisao.right >  colisaoTritao.left &&
            tiroColisao.top < colisaoTritao.bottom &&
            tiroColisao.bottom > colisaoTritao.top
        ){
            console.log("atingiu")
            somAcerto.play()
            tritaoMatados ++
            atingidos.textContent = `${tritaoMatados}`
            tipoTritao ++
            console.log(tritaoMatados)
            tritao.classList.remove('movimento_tritao')
            tela.removeChild(tiro)
        }
    }, 10)

}



document.addEventListener('keydown', (event) =>{
    switch (event.key){

    case 'ArrowUp':
    pulo();
    break;

    case 'Enter':
    iniciarJogo()
    tritao.style.left = "auto";
    estilingue.style.left = 'auto'
    break;

    case 'ArrowDown':
    atirar()
    break;
    }
}); //depois do evento, executa a função pulo