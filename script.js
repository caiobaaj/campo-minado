document.addEventListener('DOMContentLoaded', function documentoCarregado() {      // garante que todo o conteúdo do HTML seja arregado antes das ações do js
    const grid = document.querySelector('.grid');         
    const tamanhoEixo = 10;
    const bandeirasFaltando = document.querySelector('#bandeiras-faltando');
    let quantiaBombas = 20;
    let listaQuadrados = [];

    function createBoard() {        // função responsável pela criação do tabuleiro do jogo

        bandeirasFaltando.innerHTML = quantiaBombas;

        const listaBombas = Array(quantiaBombas).fill('bomba');
        const listaValida = Array(tamanhoEixo * tamanhoEixo - quantiaBombas).fill('valido');
        const listaJogo = listaValida.concat(listaBombas);                           // lista concatenada
        const listaJogoEmbaralhada = listaJogo.sort(() => Math.random() - 0.5);     // algoritmo de aleatorização das bombas no grid

        for (let i = 0; i < tamanhoEixo * tamanhoEixo; i++) {       // para cada quadrado, é atribuído um id próprio, uma classe válida ou bomba e anexada como filha do grid
                                                            
            const quadrado = document.createElement('div');
            quadrado.id = i;
            quadrado.classList.add(listaJogoEmbaralhada[i]);
            grid.appendChild(quadrado);
            listaQuadrados.push(quadrado);
            
            quadrado.addEventListener('click', function cliqueNormal() {        // função do clique com botão esquerdo, apenas revela o bloco clicado

                click(quadrado);
            })

            quadrado.addEventListener('click', function cliqueBandeira() {      // função do clique para colocar bandeiras, botao direito

                //addBandeira(quadrado)
            })
        }

        for (let i = 0; i < listaQuadrados.length; i++) {       // atribuição dos valores em cada quadrado

            let total = 0;
            const lateralEsquerda = (i % tamanhoEixo === 0);
            const lateralDireita = (i % tamanhoEixo === tamanhoEixo - 1);
            const lateralSuperior = (i < tamanhoEixo);
            const lateralInferior = (i >= tamanhoEixo*(tamanhoEixo - 1));

            if (listaQuadrados[i].classList.contains('valido')) {

                /* 
                
                listaQuadrados[i - tamanhoEixo - 1].classList.contains('bomba')     NAO PODE LATERAL SUPERIOR   NAO PODE LATERAL ESQUERDA
                listaQuadrados[i - tamanhoEixo].classList.contains('bomba')         NAO PODE LATERAL SUPERIOR
                listaQuadrados[i - tamanhoEixo + 1].classList.contains('bomba')     NAO PODE LATERAL SUPERIOR   NAO PODE LATERAL DIREITA
                listaQuadrados[i - 1].classList.contains('bomba')                                               NAO PODE LATERAL ESQUERDA
                listaQuadrados[i + 1].classList.contains('bomba')                                               NAO PODE LATERAL DIREITA
                listaQuadrados[i + tamanhoEixo - 1].classList.contains('bomba')     NAO PODE LATERAL INFERIOR   NAO PODE LATERAL ESQUERDA
                listaQuadrados[i + tamanhoEixo].classList.contains('bomba')         NAO PODE LATERAL INFERIOR
                listaQuadrados[i + tamanhoEixo + 1].classList.contains('bomba')     NAO PODE LATERAL INFERIOR   NAO PODE LATERAL DIREITA
                
                */

                if (!lateralSuperior && !lateralEsquerda && listaQuadrados[i - tamanhoEixo - 1].classList.contains('bomba')) total++;
                if (!lateralSuperior && listaQuadrados[i - tamanhoEixo].classList.contains('bomba')) total++;
                if (!lateralSuperior && !lateralDireita && listaQuadrados[i - tamanhoEixo + 1].classList.contains('bomba')) total++;
                if (!lateralEsquerda && listaQuadrados[i - 1].classList.contains('bomba')) total++;
                if (!lateralDireita && listaQuadrados[i + 1].classList.contains('bomba')) total++;
                if (!lateralInferior && !lateralEsquerda && listaQuadrados[i + tamanhoEixo - 1].classList.contains('bomba')) total++;
                if (!lateralInferior && listaQuadrados[i + tamanhoEixo].classList.contains('bomba')) total++;
                if (!lateralInferior && !lateralDireita && listaQuadrados[i + tamanhoEixo + 1].classList.contains('bomba')) total++;
                listaQuadrados[i].setAttribute('data', total);
            }
        }
    }

    createBoard();

    function click(quadrado) {
        console.log(quadrado);
    }
})

