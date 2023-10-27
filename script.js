const usopp = document.querySelector('.usopp') //cria uma variavel "usopp" e faz ela receber os atributos da classe usopp
const tritao = document.querySelector('.tritao')
const tela = document.querySelector('.tela')
const telaWidth = tela.clientWidth
const telaHeight = tela.clientHeight
let podeAtirar = true
let tiroDisponivel
let vidas
let quantidadeBalas = 0
let perdeu = true
let vida1 = document.querySelector("#vida1")
let vida2 = document.querySelector("#vida2")
let vida3 = document.querySelector("#vida3")
let vida4 = document.querySelector("#vida4")
let vida5 = document.querySelector("#vida5")
const municao = document.querySelector('.municao')
municao.textContent = quantidadeBalas
const estilingue = document.querySelector('.estilingue')
const atingidos = document.querySelector('.alvosAtingidos')
const mensagemInicial = document.querySelector('.telaInicial')
let tipoTritao
let movimentoTritao
let movimentoEstilingue
let jogoIniciado = false
let pontuacao
const pontuacaoElement = document.getElementById('scoreboard')
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
let intervaloPontuacao;
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

function atualizarPontuacao() {
    if(vidas>0){
        pontuacao = pontuacao + 1
        pontuacaoElement.textContent = `Score: ${pontuacao}`
    }
    
}
function iniciarPontuacao() {
    if(!jogoIniciado){
        intervaloPontuacao = setInterval(atualizarPontuacao, 50)
    }
}
function reniciarPontuacao() {
    if(jogoIniciado) {
        clearInterval(intervaloPontuacao)
        pontuacao = 0
        jogoIniciado = false
    }else{
        jogoIniciado = false
    }
}


function iniciarJogo() {
    jogoIniciado = true
    perdeu = false
    vidas = 5
    reniciarPontuacao()
    pontuacao = 0
    pontuacaoElement.textContent = `${pontuacao}`
    quantidadeBalas = 3
    municao.textContent = `${quantidadeBalas}`
    tipoTritao = 0
    tritaoMatados = 0
    atingidos.textContent = `${tritaoMatados}`
    Musiquinha.play()
    Musiquinha.loop = true;
    Musiquinha.volume = 0.7
    mensagemInicial.style.display = 'none'
    estilingue.style.display = 'block'
    pontuacaoElement.style.display = 'block'
    
   
    usopp.src = './images/usopp_run.gif'
    usopp.style.bottom = `0px`;
    tritao.classList.remove('movimento_tritao')
    estilingue.classList.remove('movimento_estilingue')
    usopp.classList.remove('usopp_abatido')
    
    vida1.src = "./images/vida_cheia.webp"
    vida2.src = "./images/vida_cheia.webp"
    vida3.src = "./images/vida_cheia.webp"
    vida4.src = "./images/vida_cheia.webp"
    vida5.src = "./images/vida_cheia.webp"
    


    SpawnIstilingue = setInterval(()=> {
        let movimentoEstilingue = estilingue.offsetLeft
        estilingue.classList.add('movimento_estilingue')
        
        // 
        
        if(movimentoEstilingue < -50) {
            estilingue.style.bottom = Math.random() * 180 + 'px'
            estilingue.style.display = 'none'
            estilingue.classList.remove('movimento_estilingue')
            aparicaoEstilingueParede = setTimeout(()=> {
                estilingue.classList.add('movimento_estilingue')
                estilingue.style.display = 'block'
            }, 9000)
        }
        const usoppHitbox = usopp.getBoundingClientRect();
        const estilingueHitbox = estilingue.getBoundingClientRect();
        if (
            estilingueHitbox.left < usoppHitbox.right &&
            estilingueHitbox.right > usoppHitbox.left &&
            estilingueHitbox.top < usoppHitbox.bottom &&
            estilingueHitbox.bottom > usoppHitbox.top
        ) {
            quantidadeBalas += 3
            municao.textContent = `${quantidadeBalas}`
            pegandoItem.play()
            estilingue.classList.remove('movimento_estilingue')
            estilingue.style.display = 'none'
            estilingue.style.bottom = Math.random() * 180 + 'px'
            aparicaoEstilingue = setTimeout(()=> {
                estilingue.classList.add('movimento_estilingue')
                estilingue.style.display = 'block'
            }, 9000)
                
    
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
            }
            usopp.classList.add('hit')
            usopp.style.bottom = `${usoppY}px`;
            tipoTritao ++
            setTimeout(() => {
                usopp.classList.remove('hit');
                usopp.style.bottom = `0px`;

            }, 750);
            
        }

        
        // if(tritaoMatados >= 4) {
        //     tritaoMatados --
        //     tritaoMatados = 0
        // }
        if (tipoTritao >= 5){
            tipoTritao = 0
        }
        if (vidas <= 0) {
            
            tritao.style.left = `${movimentoTritao}px`;
            usopp.src = "./images/usopp_bateu.png"
            usopp.classList.add('usopp_abatido')
            usopp.style.bottom = `${usoppY}px`;
            usopp.classList.remove('pulo');
            usopp.classList.remove('hit');
            perdeu = true
            vida1.src = "./images/vida_perdida.png"
            clearInterval(SpawnIstilingue)
            clearInterval(intervaloPontuacao)
            estilingue.style.left = `${movimentoEstilingue}px`
            telaDerrota()
            som_morte.play()
            clearInterval(iniciarJogo)
            clearInterval(loop)
            clearInterval(SpawnIstilingue)
            clearInterval(aparicaoEstilingue)
            return tipoTritao
            
    
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
    const telaRect = tela.getBoundingClientRect()
    tiro.style.left = (usoppHitbox.width + usoppHitbox.width) + 'px'
    tiro.style.bottom = (telaRect.bottom - usoppHitbox.bottom + (usoppHitbox.height / 2)) + 'px'
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
            pontuacao += 100
            somAcerto.play()
            tritaoMatados ++
            atingidos.textContent = `${tritaoMatados}`
            tipoTritao ++
            tritao.classList.remove('movimento_tritao')
            tela.removeChild(tiro)
        }
    }, 10)


}


function telaDerrota() {
    const telaDerrota = document.createElement('div')
    telaDerrota.classList.add('derrotaDiv')
    telaDerrota.innerHTML = `
    <h1>Oh não você perdeu! Aperte enter para tentar novamente!</h1>
    <h1>Sua pontuação final foi: ${pontuacao} </h1>
   `
    tela.appendChild(telaDerrota)
    document.addEventListener('keydown',(event) => {
       switch(event.key){
        case 'Enter':
        tela.removeChild(telaDerrota)
        break;    
        } 
    })  
}

document.addEventListener('keydown', (event) =>{
    switch (event.key){

    case 'ArrowUp':
    pulo();
    break;

    case 'Enter':
    iniciarJogo()
    iniciarPontuacao()
    tritao.style.left = "auto";
    estilingue.style.left = 'auto'
    break;

    case 'ArrowDown':
    atirar()
    break;

    case 'ArrowLeft':
    pausar()
    break;
    }
}); //depois do evento, executa a função pulo