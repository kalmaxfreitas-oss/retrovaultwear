(function(){

const params = new URLSearchParams(window.location.search);

const colecaoId = params.get("colecao");
const produtoIndex = params.get("produto");

if(!colecaoId) return;

const colecao = DATA.collections.find(c => c.id === colecaoId);

if(!colecao) return;

const produto = colecao.products[produtoIndex];

if(!produto) return;

document.getElementById("produtoNome").textContent = produto.name;

document.getElementById("produtoPreco").textContent =
"R$ " + produto.price;

document.getElementById("produtoImg").src = produto.img;

document.getElementById("ogImage").setAttribute(
  "content",
  window.location.origin + "/" + produto.img
);

const msg = `Olá! Quero comprar a camiseta ${produto.name}`;

document.getElementById("btnWhats").href =
"https://wa.me/5599999999999?text=" + encodeURIComponent(msg);

})();

// ZOOM DA IMAGEM

const imgProduto = document.getElementById("produtoImg");
const zoomOverlay = document.getElementById("zoomOverlay");
const zoomImg = document.getElementById("zoomImg");

if(imgProduto){

  imgProduto.addEventListener("click", () => {
    zoomImg.src = imgProduto.src;
    zoomOverlay.style.display = "flex";
  });

}

if(zoomOverlay){

  zoomOverlay.addEventListener("click", () => {
    zoomOverlay.style.display = "none";
  });

}

// BOTÃO COMPARTILHAR

const btnShare = document.getElementById("btnShare");

if(btnShare){

  btnShare.addEventListener("click", async () => {

    const url =
window.location.origin +
"/share.html?img=" +
produto.img +
"&url=colecao=" +
colecaoId +
"&produto=" +
produtoIndex;

    if(navigator.share){
      await navigator.share({
        title: document.title,
        text: "Olha essa camiseta que encontrei:",
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copiado!");
    }

  });

}




