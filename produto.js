(function(){

const params = new URLSearchParams(window.location.search);

const colecaoId = params.get("colecao");
const produtoIndex = params.get("produto");

if(!colecaoId) return;

const colecao = DATA.collections.find(c => c.id === colecaoId);
if(!colecao) return;

const produto = colecao.products[produtoIndex];
if(!produto) return;

// ELEMENTOS
const imgPrincipal = document.getElementById("produtoImg");
const miniaturasBox = document.getElementById("miniaturas");

// DADOS
document.getElementById("produtoNome").textContent = produto.name;
document.getElementById("produtoPreco").textContent = "R$ " + produto.price;

// IMAGEM PRINCIPAL
imgPrincipal.src = produto.img;

// OG IMAGE
document.getElementById("ogImage").setAttribute(
  "content",
  window.location.origin + "/" + produto.img
);

// WHATSAPP
const msg = `Olá! Quero comprar a camiseta ${produto.name}`;
document.getElementById("btnWhats").href =
"https://wa.me/5599999999999?text=" + encodeURIComponent(msg);

// 🔥 MINIATURAS (AQUI ESTÁ O SEGREDO)
if(miniaturasBox){

  const base = produto.img.substring(0, produto.img.lastIndexOf("."));
  const ext = produto.img.substring(produto.img.lastIndexOf("."));

  for(let i = 1; i <= 5; i++){

    const tentativa = i === 1 
      ? produto.img 
      : base + i + ext;

    const img = new Image();

    img.onload = () => {
      const thumb = document.createElement("img");
      thumb.src = tentativa;

      thumb.onclick = () => {
  imgPrincipal.src = tentativa;

  document.querySelectorAll(".miniaturas img")
    .forEach(i => i.classList.remove("ativa"));

  thumb.classList.add("ativa");
};

      miniaturasBox.appendChild(thumb);
    };

    img.src = tentativa;
  }

}

// ZOOM
const zoomOverlay = document.getElementById("zoomOverlay");
const zoomImg = document.getElementById("zoomImg");

imgPrincipal.addEventListener("click", () => {
  zoomImg.src = imgPrincipal.src;
  zoomOverlay.style.display = "flex";
});

zoomOverlay.addEventListener("click", () => {
  zoomOverlay.style.display = "none";
});

// SHARE
const btnShare = document.getElementById("btnShare");

btnShare.addEventListener("click", async () => {

  const url = window.location.href;

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

})();
