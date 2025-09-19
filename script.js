document.addEventListener('DOMContentLoaded', function documentoCarregado() {      // garante que todo o conteúdo do HTML seja arregado antes das ações do js
    const grid = document.querySelector('.grid');
    const bandeirasFaltando = document.querySelector('#bandeiras-faltando');
    const resultado = document.querySelector('#resultado');
    const tamanhoEixo = 10;
    let quantiaBombas = 20;
    let listaQuadrados = [];
    let ehFimDeJogo = false;
    let bandeiras = 0;

    function criaTabuleiro() {        // função responsável pela criação do tabuleiro do jogo

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

            quadrado.addEventListener('contextmenu', function cliqueBandeira() {      // função do clique para colocar bandeiras, botao direito

                addBandeira(quadrado);
            })
        }

        for (let i = 0; i < listaQuadrados.length; i++) {       // atribuição dos valores em cada quadrado

            let total = 0;
            const ehLateralEsquerda = (i % tamanhoEixo === 0);
            const ehLateralDireita = (i % tamanhoEixo === tamanhoEixo - 1);
            const ehLateralSuperior = (i < tamanhoEixo);
            const ehLateralInferior = (i >= tamanhoEixo*(tamanhoEixo - 1));

            if (listaQuadrados[i].classList.contains('valido')) {       // confere a classe de todos os vizinhos para o somatório de bombas adjacentes

                if (!ehLateralSuperior && !ehLateralEsquerda && listaQuadrados[i - tamanhoEixo - 1].classList.contains('bomba'))    total++;
                if (!ehLateralSuperior && listaQuadrados[i - tamanhoEixo].classList.contains('bomba'))                              total++;
                if (!ehLateralSuperior && !ehLateralDireita && listaQuadrados[i - tamanhoEixo + 1].classList.contains('bomba'))     total++;
                if (!ehLateralEsquerda && listaQuadrados[i - 1].classList.contains('bomba'))                                        total++;
                if (!ehLateralDireita && listaQuadrados[i + 1].classList.contains('bomba'))                                         total++;
                if (!ehLateralInferior && !ehLateralEsquerda && listaQuadrados[i + tamanhoEixo - 1].classList.contains('bomba'))    total++;
                if (!ehLateralInferior && listaQuadrados[i + tamanhoEixo].classList.contains('bomba'))                              total++;
                if (!ehLateralInferior && !ehLateralDireita && listaQuadrados[i + tamanhoEixo + 1].classList.contains('bomba'))     total++;
                listaQuadrados[i].setAttribute('data', total);
            }
        }
    }

    criaTabuleiro();

    function click(quadrado) {

        if (ehFimDeJogo || quadrado.classList.contains('checado') || quadrado.classList.contains('bandeira')) return;

        if (quadrado.classList.contains('bomba')) {
            fimDeJogo();
        } else {

            let total = quadrado.getAttribute('data');
            if (total != 0) {

                quadrado.innerHTML = total;
                const nomeNumeros = ['um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete', 'oito'];
                const valorNumero = parseInt(total) - 1;
                quadrado.classList.add(nomeNumeros[valorNumero]);
            } else {
                varreQuadrados(quadrado);
            }
        }
        
        quadrado.classList.add('checado');
    }

    function fimDeJogo() {
        
        resultado.innerHTML = 'BOOM!! Fim de Jogo!';
        ehFimDeJogo = true;

        for (let i = 0; i < listaQuadrados.length; i++) {
        
            if (listaQuadrados[i].classList.contains('bomba')){
                listaQuadrados[i].innerHTML = '💣';
                listaQuadrados[i].classList.remove('bomba');
                listaQuadrados[i].classList.add('checado');
            }
        }
    }

    function varreQuadrados(quadrado) {     // checa quadrados vizinhos que não sejam bombas quando um quadrado vazio é clicado

        const quadradoAtual = quadrado.id;
        const ehLateralEsquerda = (quadradoAtual % tamanhoEixo === 0);
        const ehLateralDireita = (quadradoAtual % tamanhoEixo === tamanhoEixo - 1);
        const ehLateralSuperior = (quadradoAtual < tamanhoEixo);
        const ehLateralInferior = (quadradoAtual >= tamanhoEixo*(tamanhoEixo - 1));

        setTimeout(function() {
            
            if (!ehLateralSuperior && !ehLateralEsquerda) {

                const novoId = parseInt(quadradoAtual) - tamanhoEixo - 1;
                const novoQuadrado = document.getElementById(novoId);
                if (!novoQuadrado.classList.contains('bomba')) {
                    click(novoQuadrado);
                }
            } 
            if (!ehLateralSuperior) {

                const novoId = parseInt(quadradoAtual) - tamanhoEixo;
                const novoQuadrado = document.getElementById(novoId);
                if (!novoQuadrado.classList.contains('bomba')) {
                    click(novoQuadrado);
                }
            } 
            if (!ehLateralSuperior && !ehLateralDireita) {

                const novoId = parseInt(quadradoAtual) - tamanhoEixo + 1;
                const novoQuadrado = document.getElementById(novoId);
                if (!novoQuadrado.classList.contains('bomba')) {
                    click(novoQuadrado);
                }
            } 
            if (!ehLateralEsquerda) {

                const novoId = parseInt(quadradoAtual) - 1;
                const novoQuadrado = document.getElementById(novoId);
                if (!novoQuadrado.classList.contains('bomba')) {
                    click(novoQuadrado);
                }
            } 
            if (!ehLateralDireita) {

                const novoId = parseInt(quadradoAtual) + 1;
                const novoQuadrado = document.getElementById(novoId);
                if (!novoQuadrado.classList.contains('bomba')) {
                    click(novoQuadrado);
                }
            } 
            if (!ehLateralInferior && !ehLateralEsquerda) {

                const novoId = parseInt(quadradoAtual) + tamanhoEixo - 1;
                const novoQuadrado = document.getElementById(novoId);
                if (!novoQuadrado.classList.contains('bomba')) {
                    click(novoQuadrado);
                }
            } 
            if (!ehLateralInferior) {

                const novoId = parseInt(quadradoAtual) + tamanhoEixo;
                const novoQuadrado = document.getElementById(novoId);
                if (!novoQuadrado.classList.contains('bomba')) {
                    click(novoQuadrado);
                }
            } 
            if (!ehLateralInferior && !ehLateralDireita) {

                const novoId = parseInt(quadradoAtual) + tamanhoEixo + 1;
                const novoQuadrado = document.getElementById(novoId);
                if (!novoQuadrado.classList.contains('bomba')) {
                    click(novoQuadrado);
                }
            } 
        }, 10)
    }

    function addBandeira(quadrado) {

        if (ehFimDeJogo) return;
        if (!quadrado.classList.contains('checado') && (bandeiras < quantiaBombas)) {

            if (!quadrado.classList.contains('bandeira')) {

                quadrado.classList.add('bandeira');
                bandeiras++;
                quadrado.innerHTML = '🚩';
                bandeirasFaltando.innerHTML = quantiaBombas - bandeiras;
                checarVitoria();
            } else {

                quadrado.classList.remove('bandeira');
                bandeiras--;
                quadrado.innerHTML = '';
                bandeirasFaltando.innerHTML = quantiaBombas - bandeiras;
            }
        }
    }

    function checarVitoria() {

        let confere = 0;
        
        for (let i = 0; i < listaQuadrados.length; i++) {
        
            if (listaQuadrados[i].classList.contains('bandeira') && listaQuadrados[i].classList.contains('bomba')) {
                confere++;
            }
            if (confere === quantiaBombas) {
                resultado.innerHTML = 'PARABÉNS!! Você Venceu!';
                ehFimDeJogo = true;
            }
        }
    }
})

