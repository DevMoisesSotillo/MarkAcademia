const html = document.querySelector('html')
const focobt = document.querySelector('.app__card-button--foco')
const curtobt = document.querySelector('.app__card-button--curto')
const longobt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector( '.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPausebt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musica = new Audio('./sons/luna-rise-part-one.mp3') 
const tempoNaTela = document.querySelector('#timer')
const audioPlay = new Audio('./sons/play.wav');
const audioPausa = new Audio('./sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')


let tempoDecorridoEmSegundos = 1000
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else{
        musica.pause()
    }
})

focobt.addEventListener('click' , () => {
    tempoDecorridoEmSegundos = 1000
    alterarContexto('foco')
    focobt.classList.add('active')
})

curtobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtobt.classList.add('active')
})

longobt.addEventListener ('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longobt.classList.add('active')
})

function alterarContexto (contexto){
    mostraTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto' , contexto)
    banner.setAttribute('src' , `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Fortaleza sua produtividade,<br>
                <strong class="app__title-strong">Comence no que importa..</strong>`
            break;
            case "descanso-curto":
                titulo.innerHTML = `
                Que tal dar um descanso? <strong class="app__title-strong"> Voce merece uma pausa curta. </strong>` 
                break;
            case "descanso-longo":
                titulo.innerHTML  = `
                Vamos voltar na sua produtividade?, <strong class="app__title-strong"> nao fique por fora! </strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        zerar()
        alert('Tempo Finalizado')
        const focoActivo = html.getAttribute('data-contexto') == 'foco'
        if(focoActivo){
            const evento = new CustomEvent('focoFinalizado')
            document.dispatchEvent (evento)
        }
        return
    }
    tempoDecorridoEmSegundos -= 1 
    mostraTempo()
    
}

startPausebt.addEventListener('click' , iniciarOuPausar)

function iniciarOuPausar (){
    if(intervaloId){
        audioPausa.play();
        zerar()
        return
    }
    audioPlay.play(); 
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src' , `./imagens/pause.png`)
}

function zerar (){

    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Comecar"
    iniciarOuPausarBtIcone.setAttribute('src' , `./imagens/play_arrow.png`)
    intervaloId = null
}

function mostraTempo (){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-br' , {minute: '2-digit' , second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostraTempo()