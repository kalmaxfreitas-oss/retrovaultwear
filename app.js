/* =========================================================
   RETROVAULTWEAR — app.js (PRONTO E SIMPLES)
   - Para mudar preço: altere SOMENTE "price" no DATA.
   - No WhatsApp aparece SOMENTE o nome do produto.
   ========================================================= */
/* =========================================================
   price: 35 (valor da camisa)
   preorder: true (disponivel por encomenda)
   last: true (ultima unidade)
   size: "M" (tamanho da camisa)
   ========================================================= */

const WHATSAPP_NUMBER = "5585994020887"; // <-- TROQUE AQUI

function waLink(message){
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

/* =========================
   DADOS DO SITE
   ========================= */
const DATA = {
  collections: [

{
      id: "Promoção",
      name: "Promoção",
      desc: "Camisetas em promoção — retrô premium.",
      cover: "images/colecoes/promoção.jpg",
      tags: ["anime", "retro", "street"],
      products: [
        { name: "Senku",   img: "images/produto/Senku.jpg", price: 35 , size: "P", last: true },
        { name: "Baki Hanma", img: "images/produto/baki.jpg", price: 35 , size: "P", last: true  },
        { name: "Toji Fushiguro", img: "images/produto/tojifushiguro.jpg", price: 35 , size: "P", last: true },
        { name: "Ichigo Kurosaki", img: "images/produto/ichigokurosaki.jpg", price: 35 , size: "P", last: true },
        { name: "Edward Elric", img: "images/produto/EdwardElric.jpg", price: 35 , size: "P", last: true }
      ]
    },

    {
      id: "street-fighter",
      name: "Coleção - Street Fighter",
      desc: "Camisetas inspiradas no universo de Street Fighter — retrô premium.",
      cover: "images/colecoes/streetfighter.jpg",
      tags: ["arcade", "retro", "game"],
      products: [
        { name: "Blanka",  img: "images/produto/blanka.jpg", price: 45, size: "M", last: true },
        { name: "Dhalsim", img: "images/produto/dhalsin.jpg", price: 45, size: "M", last: true },
        { name: "Guile",   img: "images/produto/guiler.jpg", price: 45, size: "P,M,G", preorder: true },
        { name: "Sagat",   img: "images/produto/sagat.jpg", price: 45, size: "M", last: true },
        { name: "Vega",    img: "images/produto/vega.jpg", price: 45, size: "M", last: true }
      ]
    },
    
     {
      id: "Os Cavaleiros do Zodíaco",
      name: "Coleção - Os Cavaleiros do Zodíaco",
      desc: "Camisetas inspiradas no universo de Os Cavaleiros do Zodíaco — retrô premium.",
      cover: "images/colecoes/cavaleirosdosodiacos.jpg",
      tags: ["anime", "retro", "street"],
      products: [
        { name: "Seiya de Pégaso",   img: "images/produto/saiya.jpg", price: 45, last: true , size: "P" },
        { name: "Shiryu de Dragão",   img: "images/produto/shiryu.jpg", price: 45, last: true , size: "P" },
        { name: "Hyoga de Cisne",    img: "images/produto/cisne.jpg", price: 45, last: true , size: "P" }
      ]
    },
  ]
};

/* =========================
   MENU MOBILE
   ========================= */
function initMobileMenu(){
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");
  if(!toggle || !mobile) return;

  toggle.addEventListener("click", () => mobile.classList.toggle("is-open"));
  mobile.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobile.classList.remove("is-open")));
}

/* Helpers */
function setYear(){
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
}
function initWhatsButtons(){
  const btnHeader = document.getElementById("btnWhatsHeader");
  const btnFooter = document.getElementById("btnWhatsFooter");
  const msg = "Olá! Vim pelo site RETROVAULTWEAR e quero comprar uma camiseta.";
  if(btnHeader) btnHeader.href = waLink(msg);
  if(btnFooter) btnFooter.href = waLink(msg);
}
function moneyBR(value){
  const n = Number(value);
  if(Number.isNaN(n)) return "0,00";
  return n.toFixed(2).replace(".", ",");
}
function getQueryParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

/* INDEX — Coleções */
function renderCollections(){
  const grid = document.getElementById("collectionsGrid");
  if(!grid) return;

  grid.innerHTML = DATA.collections.map(col => `
    <a class="card" href="colecao.html?id=${encodeURIComponent(col.id)}" aria-label="Abrir coleção ${col.name}">
      <img class="card__img" src="${col.cover}" alt="Imagem da coleção ${col.name}">
      <div class="card__body">
        <h3 class="card__title">${col.name}</h3>
        <p class="card__desc">${col.desc}</p>
        <div class="badges">
          ${(col.tags || []).map(t => `<span class="badge">#${t}</span>`).join("")}
        </div>
      </div>
    </a>
  `).join("");
}

/* COLECAO — Produtos */
function renderCollectionPage(){
  const productsGrid = document.getElementById("productsGrid");
  if(!productsGrid) return;

  const id = getQueryParam("id");
  const col = DATA.collections.find(c => c.id === id) || DATA.collections[0];

  const titleEl = document.getElementById("collectionTitle");
  const descEl  = document.getElementById("collectionDesc");
  if(titleEl) titleEl.textContent = col.name;
  if(descEl)  descEl.textContent = col.desc;

  document.title = `RETROVAULTWEAR — ${col.name}`;

  productsGrid.innerHTML = (col.products || []).map(p => {
    const msg = `Olá! Vim pelo site RETROVAULTWEAR e quero comprar uma camiseta do ${p.name}`; // WhatsApp só o nome
    const buyHref = waLink(msg);
    return `
      <div class="card">
      <a href="produto.html?colecao=${col.id}&produto=${col.products.indexOf(p)}">
        <img class="card__img" src="${p.img}" alt="Camiseta ${p.name}">
        <div class="card__body">
          <h3 class="card__title">${p.name}</h3>

          <p class="card__desc">ESTAMPAS EXCLUSIVAS</p>
          <div class="specs">
            <span class="spec">ALGODÃO 30.1 PENTEADO</span>
            <span class="spec">ESTAMPAS RESPIRÁVEL</span>
            <span class="spec">DISPONÍVEL: TAMANHO ${(p.size || "M")}</span>
          </div>

          <p class="price">
          
  R$ ${moneyBR(p.price ?? 45)}
  
  ${p.last ? '<span class="last-unit">ÚLTIMA UNIDADE</span>' : ''}

  ${p.preorder ? '<span class="preorder">DISPONÍVEL POR ENCOMENDA</span>' : ''}
  
</p>


          <div class="btnRow">
            <a class="btn" href="${buyHref}" target="_blank" rel="noopener">Comprar no WhatsApp</a>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/* INIT */
(function init(){
  initMobileMenu();
  initWhatsButtons();
  setYear();
  renderCollections();
  renderCollectionPage();
})();
