// Definindo minhas variáveis com as keys da API
const timeStamp = '1626409114'
const keyPublica = '0b7d24dd8212889e0da98f3b885629de'
const md5 = 'ba0d083bc1d91e1cedf20bc0cbedc150'

const arrayImagens1 = []
const arrayImagens2 = []
var escolhidas = []

var clicou = false
var clicou2 = false
var pontos = 0

// Utilizando o fetch para fazer a chmada da API + o then para ter o retorno do meu objeto JSON
fetch(`http://gateway.marvel.com/v1/public/characters?limit=10&ts=${timeStamp}&apikey=${keyPublica}&hash=${md5}`
    ).then((response) => {
        return response.json();        
    }).then((jsonParsed) => {

        for (let i = 0; i < 10; i++){
            adicionaElemento(arrayImagens1, jsonParsed.data.results[i].thumbnail.path + '.' + jsonParsed.data.results[i].thumbnail.extension)
            adicionaElemento(arrayImagens2, jsonParsed.data.results[i].thumbnail.path + '.' + jsonParsed.data.results[i].thumbnail.extension)
        }

        embaralhaElementos(arrayImagens1)
        embaralhaElementos(arrayImagens2)
    }).then(() => {
        for (let i = 0; i < 10; i++){
            geraItens(i)
        }
    })

// Função pra gerar os itens na tela 
function geraItens(i){
    let carta = document.createElement('img')
    let carta2 = document.createElement('img')
    let containerCartas = document.getElementById('divContainer')

    viraCostas(carta)
    viraCostas(carta2)
    
    // Função onde irá ficar a funcionalidade do game
    function jogo(){
        carta.addEventListener('click' , eventoCartao1)
        carta2.addEventListener('click' , eventoCartao2)

        // Verificando se os valores das cartas clicadas são iguais
        function verifica(){
            if ( escolhidas.length == 2 ){
                let cartaa1 = escolhidas[0]
                let cartaa2 = escolhidas[1]
    
                setTimeout(() => {
                    if (cartaa1.src == cartaa2.src){ 
                        // Deixando a carta branca quando clicar em SRC iguais e removendo o evento de click                       
                        cartaa1.src = '/assets/img/branco.png'
                        cartaa2.src = '/assets/img/branco.png'
                        cartaa1.style.border = 'none'
                        cartaa2.style.border = 'none'
                        cartaa1.removeEventListener('click', eventoCartao1)
                        cartaa2.removeEventListener('click', eventoCartao2)
                        cartaa1.style.cursor = 'default'
                        cartaa2.style.cursor = 'default'
                        
                        // Adicionando pontuação
                        addPontos()
                    }else{
                        viraCostas(cartaa1)
                        viraCostas(cartaa2)
                    }
                    escolhidas = []
                }, 400);
            } 
        }
        
        function eventoCartao1(){
            if (carta.src != 'assets/img/branco.png'){
                carta.id = i
                carta.src = arrayImagens1[i]
                escolhidas.push(carta)
            }
            verifica()
        }

        function eventoCartao2(){
            if (carta2.src != 'assets/img/branco.png'){
                carta2.id = i
                carta2.src = arrayImagens2[i]
                escolhidas.push(carta2)
            }
            verifica()
        }
    }

    jogo()
    containerCartas.appendChild(carta)
    containerCartas.appendChild(carta2)

}

// Função para mostrar o verso da "carta", no caso mudar o src da img
function viraCostas(carta){
    carta.src = '/assets/img/costasCarta.png'
}

// Add elemento no array
function adicionaElemento(array, elemento){
    array.push(elemento)
}

// Função para embaralhar o aray
function embaralhaElementos(array) {
    var m = array.length, t, i;
  
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
  
    return array;
}

// Função para adicionar os pontos
function addPontos(){
    let textoPontos = document.getElementById('totalPontos')
    pontos += 1
    textoPontos.innerHTML = pontos
    if (pontos == 10){
        mostraFinal()
    }
}

// Função para adicionar o final ao chegar nos 10 pontos
function mostraFinal(){
    let containerCartas = document.getElementById('divContainer')
    let containerFinal = document.getElementById('final')
    let textoRelogar = document.getElementById('relogar')
    containerCartas.style.display = 'none'
    containerFinal.style.display = 'block'
    textoRelogar.addEventListener('click', () => {
        document.location.reload()
    })    
}