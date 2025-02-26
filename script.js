let carrinho = [];

function increase(button) {
    let item = button.closest(".item"); 
    let title = item.querySelector(".titulo").textContent; 
    let quantitySpan = item.querySelector(".quantity-btn span");
    let priceSpan = item.querySelector("span"); // Pegando o preço do produto diretamente do <span>
    let price = parseFloat(priceSpan.textContent.replace("R$ ", "").replace(",", ".")); // Pegando o preço como número

    let quantity = parseInt(quantitySpan.textContent);
    quantity++;
    quantitySpan.textContent = quantity;

    let produtoExistente = carrinho.find(produto => produto.nome === title);

    if (produtoExistente) {
        produtoExistente.quantidade = quantity; 
    } else {
        carrinho.push({ nome: title, quantidade: quantity, preco: price });
    }

    console.log(carrinho);
}

function decrease(button) {
    let item = button.closest(".item"); 
    let title = item.querySelector(".titulo").textContent; 
    let quantitySpan = item.querySelector(".quantity-btn span");
    let priceSpan = item.querySelector("span"); 
    let price = parseFloat(priceSpan.textContent.replace("R$ ", "").replace(",", "."));

    let quantity = parseInt(quantitySpan.textContent);

    if (quantity > 0) {
        quantity--;
        quantitySpan.textContent = quantity;
    }

    let produtoExistente = carrinho.find(produto => produto.nome === title);

    if (produtoExistente) {
        if (quantity > 0) {
            produtoExistente.quantidade = quantity;
        } else {
            carrinho = carrinho.filter(produto => produto.nome !== title);
        }
    }

    console.log(carrinho);
}

document.getElementById("fecharPedido").addEventListener("click", function () {
    let telefone = "5522999668509";
    let mensagem = "Olá, gostaria de fazer um pedido: %0A%0A";

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let total = 0;

    // Concatenando os itens do carrinho na mensagem e calculando o valor total
    carrinho.forEach(item => {
        let itemTotal = item.preco * item.quantidade;
        total += itemTotal;
        mensagem += `${item.nome} - Qtd: *${item.quantidade}* - R$ ${itemTotal.toFixed(2)}%0A`;
    });

    // Adicionando o valor total no final da mensagem
    mensagem += `%0ATotal: R$ ${total.toFixed(2)}%0AChave pix: 12999999999`;

    let link = `https://wa.me/${telefone}?text=${mensagem}`;
    window.open(link, "_blank");
});