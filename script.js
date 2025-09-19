document.addEventListener('DOMContentLoaded', function() {                                      // garante que todo o conteúdo do HTML seja
    const grid = document.querySelector('.grid')                                                // carregado antes das ações do js
    const tamanhoEixo = 10 
    const bandeirasFaltando = document.querySelector('#bandeiras-faltando')
    let quantiaBombas = 20

    function createBoard() {                                                                    // função responsável pela criação do tabuleiro do jogo

        bandeirasFaltando.innerHTML = quantiaBombas

        const listaBombas = Array(quantiaBombas).fill('bomba')  
        const listaValida = Array(tamanhoEixo * tamanhoEixo - quantiaBombas).fill('valido')
        const listaJogo = listaValida.concat(listaBombas)                                       // lista concatenada
        const listaEmbaralhada = listaJogo.sort(() => Math.random() - 0.5);                     // algoritmo de aleatorização das bombas no grid

        for (let i = 0; i < tamanhoEixo * tamanhoEixo; i++) {                                   // para cada quadrado, é atribuído um id próprio,
                                                                                                // uma classe válida ou bomba e anexada como filha do grid
            const square = document.createElement('div')
            square.id = i
            square.classList.add(listaEmbaralhada[i])
            grid.appendChild(square)
        }
    }
    createBoard()

})

