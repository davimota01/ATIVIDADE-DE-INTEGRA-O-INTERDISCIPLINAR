let carrinho = [];

function alternarTema() {
document.body.classList.toggle("light-mode");
}

function abrirModal(idModal) {
document.getElementById(idModal).style.display = "flex";
}

function fecharModal(idModal) {
document.getElementById(idModal).style.display = "none";
}

function adicionarAoCarrinho(nome, preco) {
let item = {
nome: nome,
preco: preco
};

carrinho.push(item);
atualizarCarrinho();

localStorage.setItem("carrinhoSalvo", JSON.stringify(carrinho));
alert(nome + " adicionado ao carrinho!");
}

function atualizarCarrinho() {
let containerItens = document.getElementById("itensCarrinho");
let totalElemento = document.getElementById("valorTotal");
let qtdElemento = document.getElementById("qtdCarrinho");

qtdElemento.innerText = carrinho.length;

if (carrinho.length === 0) {
containerItens.innerHTML = "<p>O carrinho está vazio.</p>";
totalElemento.innerText = "0.00";
return;
}

containerItens.innerHTML = "";
let total = 0;

for (let i = 0; i < carrinho.length; i++) {
containerItens.innerHTML += `<p>${carrinho[i].nome} - R$ ${carrinho[i].preco.toFixed(2)}</p>`;
total += carrinho[i].preco;
}

totalElemento.innerText = total.toFixed(2);
}

function finalizarPedido() {
if (carrinho.length === 0) {
alert("Seu carrinho está vazio!");
return;
}

let pedidoJSON = JSON.stringify(carrinho);
console.log("Enviando pedido ao servidor C#:", pedidoJSON);

alert("Pedido realizado com sucesso!");
carrinho = [];
localStorage.removeItem("carrinhoSalvo");
atualizarCarrinho();
fecharModal("modalCarrinho");
}

function aplicarMascaraCPF(input) {
let valor = input.value.replace(/\D/g, "");

if (valor.length > 3 && valor.length <= 6) {
valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
} else if (valor.length > 6 && valor.length <= 9) {
valor = valor.replace(/(\d{3})(\d{3})(\d)/, "$1.$2.$3");
} else if (valor.length > 9) {
valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4");
}

input.value = valor;
}

function aplicarMascaraTelefone(input) {
let valor = input.value.replace(/\D/g, "");

if (valor.length > 2 && valor.length <= 7) {
valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
} else if (valor.length > 7) {
valor = valor.replace(/(\d{2})(\d{5})(\d)/, "($1) $2-$3");
}

input.value = valor;
}

function filtrarProdutos() {
let termo = document.getElementById("campoBusca").value.toLowerCase();
let cards = document.querySelectorAll(".card-produto");

for (let i = 0; i < cards.length; i++) {
let nomeProduto = cards[i].querySelector("h3").innerText.toLowerCase();
if (nomeProduto.includes(termo)) {
cards[i].style.display = "flex";
} else {
cards[i].style.display = "none";
}
}
}

function salvarUsuario(event) {
event.preventDefault();

let usuario = {
nome: document.getElementById("nome").value,
cpf: document.getElementById("cpf").value,
telefone: document.getElementById("telefone").value,
endereco: document.getElementById("endereco").value
};

localStorage.setItem("usuarioDados", JSON.stringify(usuario));
alert("Dados cadastrados com sucesso!");
}

function fazerLogin(event) {
event.preventDefault();
alert("Login efetuado com sucesso!");
fecharModal("modalLogin");
}