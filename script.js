// script.js

const produtos = [
    { id: 1, nome: "Camisa", preco: 25.00, quantidade: 1 },
    { id: 2, nome: "Calça", preco: 35.00, quantidade: 1 },
    { id: 3, nome: "Tênis", preco: 50.00, quantidade: 1 },
    // Adicione mais produtos aqui
];

const carrinho = [];

let total = 0;

function exibirProdutos() {
    const listaProdutos = document.getElementById("lista-produtos");
    listaProdutos.innerHTML = ""; // Limpa produtos anteriores

    produtos.forEach(produto => {
        const divProduto = document.createElement("div");
        divProduto.classList.add("produto");

        divProduto.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <input type="number" value="${produto.quantidade}" min="1" max="10"
                onchange="atualizarQuantidadeCarrinho(${produto.id}, this.value)">
            <button onclick="adicionarCarrinho(${produto.id})">Adicionar</button>
        `;

        listaProdutos.appendChild(divProduto);
    });
}

function adicionarCarrinho(idProduto) {
    const produto = produtos.find(p => p.id === idProduto);
    const quantidade = document.querySelector(`#lista-produtos input[data-id="${idProduto}"]`).value;

    if (produto && quantidade > 0) {
        produto.quantidade = parseInt(quantidade); // Converte para número
        carrinho.push(produto);
        atualizarCarrinho();
    }
}

function atualizarQuantidadeCarrinho(idProduto, novaQuantidade) {
    const produto = carrinho.find(p => p.id === idProduto);
    if (produto) {
        produto.quantidade = parseInt(novaQuantidade);
        atualizarCarrinho();
    }
}

function atualizarCarrinho() {
    const itensCarrinho = document.getElementById("itens-carrinho");
    itensCarrinho.innerHTML = "";
    total = 0;

    carrinho.forEach(produto => {
        const li = document.createElement("li");
        li.textContent = `${produto.nome} x ${produto.quantidade}: R$ ${produto.preco * produto.quantidade.toFixed(2)}`;
        itensCarrinho.appendChild(li);

        total += produto.preco * produto.quantidade;
    });

    document.getElementById("total").textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Chamadas iniciais
exibirProdutos();
atualizarCarrinho(); // Carrinho vazio inicialmente
  
