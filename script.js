document.addEventListener('DOMContentLoaded', function documentoCarregado() {      // garante que todo o conteúdo do HTML seja arregado antes das ações do js
    const grid = document.querySelector('.grid')         
    const tamanhoEixo = 10 
    const bandeirasFaltando = document.querySelector('#bandeiras-faltando')
    let quantiaBombas = 20
    let listaQuadrados = []

    function createBoard() {        // função responsável pela criação do tabuleiro do jogo

        bandeirasFaltando.innerHTML = quantiaBombas

        const listaBombas = Array(quantiaBombas).fill('bomba')  
        const listaValida = Array(tamanhoEixo * tamanhoEixo - quantiaBombas).fill('valido')
        const listaJogo = listaValida.concat(listaBombas)                           // lista concatenada
        const listaJogoEmbaralhada = listaJogo.sort(() => Math.random() - 0.5);     // algoritmo de aleatorização das bombas no grid

        for (let i = 0; i < tamanhoEixo * tamanhoEixo; i++) {       // para cada quadrado, é atribuído um id próprio, uma classe válida ou bomba e anexada como filha do grid
                                                            
            const quadrado = document.createElement('div')
            quadrado.id = i
            quadrado.classList.add(listaJogoEmbaralhada[i])
            grid.appendChild(quadrado)
            listaQuadrados.push(quadrado)       // adiciona os quadrados na lista
            
            quadrado.addEventListener('click', function cliqueNormal() {        // função do clique com botão esquerdo, apenas revela o bloco clicado

                click(quadrado)
            })

            quadrado.addEventListener('click', function cliqueBandeira() {      // função do clique para colocar bandeiras, botao direito

                //addBandeira(quadrado)
            })
        }

    }

    createBoard()

    function click(quadrado) {
        console.log(quadrado)
    }
})

