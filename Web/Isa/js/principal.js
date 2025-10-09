/*let currentIndex = 0; // Índice do item atual
const items = document.querySelectorAll('.item'); // Seleciona todos os itens do carrossel
const totalItems = items.length; // Total de itens

// Função para mostrar o item atual
function showCurrentItem() {
    const offset = -currentIndex * 100; 
    document.querySelector('.slide').style.transform = `translateX(${offset}%)`; // Aplica a transformação
}

// Função para ir para o próximo item
function nextItem() {
    currentIndex = (currentIndex + 1) % totalItems; 
    showCurrentItem(); // Atualiza a exibição
}

// Função para ir para o item anterior
function prevItem() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Decrementa o índice
    showCurrentItem(); // Atualiza a exibição
}

// Adiciona eventos de clique aos botões
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

next.addEventListener('click', nextItem);
prev.addEventListener('click', prevItem);

// Exibe o primeiro item ao carregar a página
showCurrentItem();
*/




let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})