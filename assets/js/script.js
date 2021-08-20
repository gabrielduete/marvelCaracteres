// Definindo minhas variáveis com as keys da API
const timeStamp = ''
const keyPublica = ''
const md5 = ''

// Arrys utilizados nas funções de Search
var arrayNomes = []
var arrayDivs = []
var arrayTitulos = []
var arrayDivsQuadrinhos = []

// Utilizando o fetch para fazer a chmada da API + o then para ter o retorno do meu objeto JSON
fetch(`BOTA SEU TOKEN DA API AQUI`
    ).then((response) => {
        return response.json();        
    }).then((jsonParsed) => {
        const divHerois = document.querySelector('#meusHerois')
        jsonParsed.data.results.forEach( (element) => {
            const srcImagem = element.thumbnail.path + '.' + element.thumbnail.extension
            const nomeHeroi = element.name
            var desc = verificaDesc(element.description)

            geradorDivHeroi(srcImagem, nomeHeroi, desc, divHerois)
        })
})

// Pegando os quadrinhos da API
fetch(`BOTA SEU TOKEN DA API AQUI`
    ).then((response) => {
        return response.json();        
    }).then((jsonParsed) => {
        const divQuadrinhos = document.querySelector('#meusQuadrinhos')
        jsonParsed.data.results.forEach( (element) => {
            const srcImagem = element.thumbnail.path + '.' + element.thumbnail.extension
            const titleQuadrinho = element.title
            var desc = verificaDesc(element.description)

            geradorDivQuadrinho(srcImagem, titleQuadrinho, desc, divQuadrinhos)
        })

})

// Função responsável por adicionar a div de herois
function geradorDivHeroi (srcImage, nomeHeroi, desc, div){
    // Criando as divs
    const divPai = document.createElement('div')
    const divFilho = document.createElement('div')
    const textName = document.createElement('p')
    const img = document.createElement('img')
    const descricao = document.createElement('p')
    var textoDiv
    var addDiv

    // Adicionando valores aos elementos de acordo com as propriedades retornadas do json
    textName.textContent = nomeHeroi
    img.src = srcImage
    descricao.textContent = desc
    
    // Adicionando as divs
    divFilho.appendChild(textName)
    divFilho.appendChild(img)
    divPai.appendChild(divFilho)
    divPai.classList.add('personagem')
    textoDiv = divPai.textContent
    adicionaTexto(textoDiv)
    addDiv = divPai
    adicionaDiv(addDiv)

    // Estilizando meu texto e imagem
    textName.style.textAlign = 'center'
    textName.style.backgroundColor = 'rgb(25,25,25)'
    textName.style.height = '100px'
    textName.style.borderRadius = '30px 0px 0px 0px'
    textName.style.transition = '0.40s'
    img.style.borderTop = '3px solid #ee2027'
    descricao.style.display = 'none'

    // Colocando Eventos de mouse hover e out. Mudando as cores.
    divFilho.addEventListener('mouseover', () => {
        textName.style.backgroundColor = '#ee2027'
        img.style.borderTop = '3px solid rgb(25,25,25)'
    })

    divFilho.addEventListener('mouseout', () => {
        textName.style.backgroundColor = "rgb(25,25,25)"
        img.style.borderTop = '3px solid #ee2027'
    })

    // Função do meu Search
    const buscador = document.getElementById('search')

    const buscaHeroi = buscador.onkeyup = function (e){
        var valorDigitado = this.value
        const compara = arrayNomes.findIndex( element => element == valorDigitado)
        if (valorDigitado == "" || valorDigitado == undefined){
            arrayDivs.forEach( (o) => {
                o.classList.add('personagem')
                o.classList.remove('mostrar')
                o.style.margin = '1% 1%'
                o.classList.remove('esconder')
                paginacao.arrumaDivs()
            })
        }
        if (compara != -1){
            for (let i of arrayDivs){
                if (i.textContent == valorDigitado){
                    i.classList.add('mostrar')
                    i.style.margin = '0 auto'
                }else{
                    i.classList.remove('mostrar')
                    i.classList.add('esconder')
                    i.style.margin = '1% 1%'
                }
            }
        }
    }

    function adicionaTexto(texto){ // Função para adicionar o texto da div no meu array
        arrayNomes.push(texto)
    }

    function adicionaDiv(addDiv){ // Função para adicionar as divs no meu array
        arrayDivs.push(addDiv)
    }

    buscador.addEventListener('focus', () => {
        buscaHeroi()
    })

    // Paginação
    // Guardando itens pra paginação dos caracteres
    const itens = {
        pag1: document.getElementById('pag1'),
        pag2: document.getElementById('pag2'),
        prox: document.getElementById('prox'),
        voltar: document.getElementById('voltar'),
        arrumar: true,
        array1: arrayDivs.slice(0,20),
        array2: arrayDivs.slice(20,40),
    }

    const paginacao = {
        paginacao(){ // Ir na página do número clicado
            itens.pag1.addEventListener('click', () => {
                itens.array2.forEach( element => {
                    element.classList.add('esconder')
                    element.classList.remove('mostrar')
                })

                itens.array1.forEach( element => {
                    element.classList.add('mostrar')
                    element.style.margin = '1%'
                })

                itens.arrumar = false
            })

            itens.pag2.addEventListener('click', () => {
                itens.array1.forEach( element => {
                    element.classList.add('esconder')
                    element.classList.remove('mostrar')
                })

                itens.array2.forEach( element => {
                    element.classList.add('mostrar')
                    element.style.margin = '1%'
                })

                itens.arrumar = true
            })
        },
        voltar(){ // Prox Página
            itens.voltar.addEventListener('click', () => {
                itens.array2.forEach( element => {
                    element.classList.add('esconder')
                    element.classList.remove('mostrar')
                })

                itens.array1.forEach( element => {
                    element.classList.add('mostrar')
                    element.style.margin = '1%'
                })

                itens.arrumar = false
            })

        },
        prox(){ // Voltar Página
            itens.prox.addEventListener('click', () => {
                itens.array1.forEach( element => {
                    element.classList.add('esconder')
                    element.classList.remove('mostrar')
                })

                itens.array2.forEach( element => {
                    element.classList.add('mostrar')
                    element.style.margin = '1%'
                })
                
                itens.arrumar = true
            })
            
        },
        arrumaDivs(){ // Vai reagrupar as divs quando clicar no Search            
            if (itens.arrumar == true){
                itens.array2.forEach( element => {
                    element.classList.add('esconder')
                    element.classList.remove('mostrar')
                })

                itens.array1.forEach( element => {
                    element.classList.add('mostrar')
                    element.style.margin = '1%'
                })

                itens.arrumar = false
            }else{
                itens.array1.forEach( element => {
                    element.classList.add('esconder')
                    element.classList.remove('mostrar')
                })

                itens.array2.forEach( element => {
                    element.classList.add('mostrar')
                    element.style.margin = '1%'
                })

                itens.arrumar = true
            }
        }
    }

    function geraModal(){

        const itens = {
            containerModal: document.getElementById('containerModal'),
            modal: document.getElementById('modal'),
            texto: document.createElement('p'),
            textDesc: document.createElement('text'),
            imagem: document.createElement('img'),
            fechar: document.getElementById('fechar')
        }

        // Evento para aparecer o modal ao clicar no personagem
        divFilho.addEventListener('click', () => {
            itens.containerModal.style.display = 'flex'
            itens.texto.innerHTML = textName.textContent
            itens.imagem.src = srcImage
            itens.textDesc.innerHTML = desc
            itens.textDesc.classList.add('desc')

            itens.modal.appendChild(itens.texto)
            itens.modal.appendChild(itens.imagem)
            itens.modal.appendChild(itens.textDesc)
        })

        // Função para chamar o evento para fechar o modal
        function fechar(item){
            item.addEventListener('click', () => {
                itens.containerModal.style.display = 'none'
                itens.modal.removeChild(itens.texto)
                itens.modal.removeChild(itens.imagem)
                itens.modal.removeChild(itens.textDesc)
            })
        }
        fechar(itens.fechar)
        fechar(itens.containerModal)
    }

    paginacao.paginacao()
    paginacao.prox()
    paginacao.voltar()
    paginacao.arrumaDivs()
    geraModal()

    div.appendChild(divPai)
}

// Função responsável por adicionar a div de quadrinhos
function geradorDivQuadrinho (srcImage, nomeHeroi, desc, div){
    // Criando as divs
    const divPai = document.createElement('div')
    const divFilho = document.createElement('div')
    const title = document.createElement('p')
    const img = document.createElement('img')
    const descricao = document.createElement('p')
    var titulo
    var addDivPai

    // Adicionando valores aos elementos de acordo com as propriedades retornadas do json
    title.textContent = nomeHeroi
    img.src = srcImage
    descricao.textContent = desc
    
    // Adicionando as divs
    divFilho.appendChild(title)
    divFilho.appendChild(img)
    divFilho.appendChild(descricao)
    divPai.appendChild(divFilho)
    divPai.classList.add('personagem')
    titulo = divPai.textContent
    adicionaTitulo(titulo)
    addDivPai = divPai
    adicionaDivQuadrinhos(addDivPai)

    // Estilizando meu texto e imagem
    title.style.textAlign = 'center'
    title.style.backgroundColor = 'rgb(25,25,25)'
    title.style.color =  'white'
    title.style.height = '100px'
    title.style.borderRadius = '30px 0px 0px 0px'
    img.style.borderTop = '3px solid #ee2027'
    descricao.style.display = 'none'

    // Colocando Eventos de mouse hover e out. Mudando as cores.
    divFilho.addEventListener('mouseover', () => {
        title.style.backgroundColor = '#ee2027'
        img.style.borderTop = '3px solid rgb(25,25,25)'
    })

    divFilho.addEventListener('mouseout', () => {
        title.style.backgroundColor = "rgb(25,25,25)"
        img.style.borderTop = '3px solid #ee2027'
    })

    // Função do meu Search dos quadrinhos
    const buscador = document.getElementById('search1')

    const buscaQuadrinhos = buscador.onkeyup = function (e){
        var valorDigitado = this.value
        const compara = arrayTitulos.findIndex( element => element == valorDigitado)
        if (valorDigitado == "" || valorDigitado == undefined){
            arrayDivsQuadrinhos.forEach( (o) => {
                o.classList.add('personagem')
                o.classList.remove('mostrar')
                o.style.margin = '1% 1%'
                o.classList.remove('esconder')
                paginacao.arrumaDivs()
            })
        }
        if (compara != -1){
            for (let i of arrayDivsQuadrinhos){
                if (i.textContent == valorDigitado){
                    i.classList.add('mostrar')
                    i.style.margin = '0 auto'
                }else{
                    i.classList.remove('mostrar')
                    i.classList.add('esconder')
                    i.style.margin = '1% 1%'
                }
            }
        }
    }

    function adicionaTitulo(titulo){
        arrayTitulos.push(titulo)
    }

    function adicionaDivQuadrinhos(divQuadr){
        arrayDivsQuadrinhos.push(divQuadr)
    }

    buscador.addEventListener('focus', () => {
        buscaQuadrinhos()
    })

    // Paginação dos quadrinhos
    const itens = {
        // Armazenando itens para a paginação dos quadrinhos
        pag1: document.getElementById('pag1-2'),
        pag2: document.getElementById('pag2-2'),
        prox: document.getElementById('prox2'),
        voltar: document.getElementById('voltar2'),
        arrumar: true,
        array1: arrayDivsQuadrinhos.slice(0,20),
        array2: arrayDivsQuadrinhos.slice(20,40),
    }

    const paginacao = {
        paginacao(){ // Ir na página do número clicado
            itens.pag1.addEventListener('click', () => {
                itens.array2.forEach( element => {
                    element.classList.add('esconder')
                    element.classList.remove('mostrar')
                })

                itens.array1.forEach( element => {
                    element.classList.add('mostrar')
                    element.style.margin = '1%'
                })

                itens.arrumar = false
            })

            itens.pag2.addEventListener('click', () => {
                itens.array1.forEach( element => {
                    element.classList.add('esconder')
                    element.classList.remove('mostrar')
                })

                itens.array2.forEach( element => {
                    element.classList.add('mostrar')
                    element.style.margin = '1%'
                })

                itens.arrumar = true
            })
        },
        voltar(){ // Prox Página
            itens.voltar.addEventListener('click', () => {
                itens.array2.forEach( element => {
                    element.classList.add('esconder')
                    element.classList.remove('mostrar')
                })

                itens.array1.forEach( element => {
                    element.classList.add('mostrar')
                    element.style.margin = '1%'
                })

                itens.arrumar = false
            })

        },
        prox(){ // Voltar Página
            itens.prox.addEventListener('click', () => {
                itens.array1.forEach( element => {
                    element.classList.add('esconder')
                    element.classList.remove('mostrar')
                })

                itens.array2.forEach( element => {
                    element.classList.add('mostrar')
                    element.style.margin = '1%'
                })
                
                itens.arrumar = true
            })
            
        },
        arrumaDivs(){ // Vai reagrupar as divs quando clicar no Search            
            if (itens.arrumar == true){
                itens.array2.forEach( element => {
                    element.classList.add('esconder')
                    element.classList.remove('mostrar')
                })

                itens.array1.forEach( element => {
                    element.classList.add('mostrar')
                    element.style.margin = '1%'
                })

                itens.arrumar = false
            }else{
                itens.array1.forEach( element => {
                    element.classList.add('esconder')
                    element.classList.remove('mostrar')
                })

                itens.array2.forEach( element => {
                    element.classList.add('mostrar')
                    element.style.margin = '1%'
                })

                itens.arrumar = true
            }
        }
    }

    function geraModal(){

        const itens = {
            containerModal: document.getElementById('containerModal-2'),
            modal: document.getElementById('modal-2'),
            texto: document.createElement('p'),
            textDesc: document.createElement('text'),
            imagem: document.createElement('img'),
            fechar: document.getElementById('fechar-2'),
        }

        // Evento para aparecer o modal ao clicar no personagem
        divFilho.addEventListener('click', () => {
            itens.containerModal.style.display = 'flex'
            itens.texto.innerHTML = title.textContent
            itens.imagem.src = srcImage
            itens.textDesc.innerHTML = desc
            itens.textDesc.classList.add('desc')

            itens.modal.appendChild(itens.texto)
            itens.modal.appendChild(itens.imagem)
            itens.modal.appendChild(itens.textDesc)
        })

        // Função para chamar o evento para fechar o modal
        function fechar(item){
            item.addEventListener('click', () => {
                itens.containerModal.style.display = 'none'
                itens.modal.removeChild(itens.texto)
                itens.modal.removeChild(itens.imagem)
                itens.modal.removeChild(itens.textDesc)
            })
        }
        fechar(itens.fechar)
        fechar(itens.containerModal)
    }
    
    paginacao.paginacao()
    paginacao.prox()
    paginacao.voltar()
    paginacao.arrumaDivs()
    geraModal()

    div.appendChild(divPai)
}

// Função para verificar se a descrição da minha div ta vazia
function verificaDesc(descricao){
    if (descricao == "" ){
        return descricao = "Esse character não possui descrição."
    }else{
        return descricao
    }
}

function menuzin(){
    const minhaUl = document.getElementById('minhaUl')
    const botaoToggle = document.getElementById('botao')
    const botaoToggle2 = document.getElementById('botao-2')

    botaoToggle.addEventListener('click', () => {
        minhaUl.style.display = 'flex'
        minhaUl.style.flexDirection = 'column'
        minhaUl.style.position = 'absolute'
        minhaUl.style.top = '0'
        minhaUl.style.left = '60%'
        minhaUl.style.width = '80%'
        minhaUl.style.borderRadius = '300px'
        minhaUl.style.backgroundColor = 'rgb(20, 20, 20)'
        minhaUl.style.transform =  'transform: translateY(40px)'
        botaoToggle.style.display = 'none'
        botaoToggle2.style.display = 'block'
    })

    botaoToggle2.addEventListener('click', () => {
        minhaUl.style.display = 'none'
        botaoToggle2.style.display = 'none'
        botaoToggle.style.display = 'block'
    })
}menuzin()
