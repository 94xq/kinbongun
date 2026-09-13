const products = [
  {id:'premium-box',category:'BUNDLES',title:'PREMIUM BOX',image:'assets/premium-box.png',price:39.99,checkout:'https://buy.stripe.com/aFaeV531Lc9pfNs8js5Rm0b',featured:1},
  {id:'starter-box',category:'BUNDLES',title:'STARTER BOX',image:'assets/starter-box.png',price:29.99,checkout:'https://buy.stripe.com/5kQ5kv59T8Xdat8dDM5Rm0c',featured:2},
  {id:'starter-bundle',category:'BUNDLES',title:'STARTER BUNDLE',image:'assets/starter-bundle.png',price:34.99,checkout:'https://buy.stripe.com/14A3cnfOx2yP1WC0R05Rm0d',featured:3},
  {id:'knitwear-bundle',category:'BUNDLES',title:'KNITWEAR BUNDLE',image:'assets/knitwear-bundle.png',price:39.99,checkout:'https://buy.stripe.com/14AfZ91XH2yP1WC6bk5Rm0e',featured:4},
  {id:'summer-bundle',category:'BUNDLES',title:'SUMMER BUNDLE',image:'assets/summer-bundle.jpg',price:29.99,checkout:'https://buy.stripe.com/8x24grdGp3CTeJo6bk5Rm0f',featured:5},
  {id:'fragrance-bundle',category:'BUNDLES',title:'FRAGRANCE BUNDLE',image:'assets/fragrance-bundle.jpg',price:34.99,checkout:'https://buy.stripe.com/cNi7sD59T5L1cBg8js5Rm0g',featured:6},
  {id:'essentials-bundle',category:'BUNDLES',title:'ESSENTIALS BUNDLE',image:'assets/essentials-bundle.png',price:34.99,checkout:'https://buy.stripe.com/6oU3cn8m5a1h8l043c5Rm0h',featured:7},
  {id:'grey-zip-hoodie',category:'CLOTHING',title:'GREY ZIP HOODIE',image:'assets/grey-zip-hoodie.jpg',price:22.99,checkout:'https://buy.stripe.com/3cIbITcCl1uL30G9nw5Rm00',featured:8},
  {id:'black-puffer-jacket',category:'CLOTHING',title:'BLACK PUFFER JACKET',image:'assets/black-puffer.jpg',price:29.99,checkout:'https://buy.stripe.com/9B63cneKt7T944KeHQ5Rm01',featured:9},
  {id:'navy-cable-knit-sweater',category:'CLOTHING',title:'NAVY CABLE KNIT SWEATER',image:'assets/navy-knit-sweater.png',price:24.99,checkout:'https://buy.stripe.com/eVq6oz7i1flB6cS2Z85Rm02',featured:10},
  {id:'navy-zip-hoodie',category:'CLOTHING',title:'NAVY ZIP HOODIE',image:'assets/navy-zip-hoodie.png',price:22.99,checkout:'https://buy.stripe.com/9B614fbyhgpF7gWarA5Rm03',featured:11},
  {id:'black-graphic-hoodie',category:'CLOTHING',title:'BLACK GRAPHIC HOODIE',image:'assets/black-graphic-hoodie.png',price:19.99,checkout:'https://buy.stripe.com/cNieV56dX6P5gRwdDM5Rm04',featured:12},
  {id:'black-tracksuit',category:'CLOTHING',title:'BLACK TRACKSUIT',image:'assets/black-tracksuit.png',price:27.99,checkout:'https://buy.stripe.com/3cIfZ9dGp6P59p4dDM5Rm05',featured:13},
  {id:'grey-cardholder',category:'ACCESSORIES',title:'GREY CARDHOLDER',image:'assets/grey-cardholder.jpg',price:8.99,checkout:'https://buy.stripe.com/bJe7sD6dX8Xd1WCgPY5Rm06',featured:14},
  {id:'black-patterned-belt',category:'ACCESSORIES',title:'BLACK PATTERNED BELT',image:'assets/black-patterned-belt.png',price:11.99,checkout:'https://buy.stripe.com/5kQ14fbyhb5l44K9nw5Rm07',featured:15},
  {id:'gold-fragrance',category:'FRAGRANCES',title:'GOLD FRAGRANCE',image:'assets/gold-fragrance.jpg',price:17.99,checkout:'https://buy.stripe.com/dRm14ffOxb5l7gWbvE5Rm08',featured:16},
  {id:'roma-fragrance',category:'FRAGRANCES',title:'ROMA FRAGRANCE',image:'assets/roma-fragrance.jpg',price:17.99,checkout:'https://buy.stripe.com/3cI7sD1XH1uL30GeHQ5Rm09',featured:17},
  {id:'classic-fragrance',category:'FRAGRANCES',title:'CLASSIC FRAGRANCE',image:'assets/classic-fragrance.jpg',price:17.99,checkout:'https://buy.stripe.com/9B628j9q9flB8l0fLU5Rm0a',featured:18}
];

const grid = document.querySelector('#productGrid');
const count = document.querySelector('#productCount');
const empty = document.querySelector('#emptyState');
const searchInput = document.querySelector('#searchInput');
const sortSelect = document.querySelector('#sortSelect');
const bagDrawer = document.querySelector('#bagDrawer');
const bagItems = document.querySelector('#bagItems');
const bagCount = document.querySelector('#bagCount');
const scrim = document.querySelector('#scrim');
let category = 'ALL';
let query = '';
let sort = 'featured';
let bag = JSON.parse(localStorage.getItem('kim-bag-v2') || '[]');

const ASSET_VERSION = '20260913-photo-fix-1';
const imageUrl = path => `${path}?v=${ASSET_VERSION}`;

const eur = n => new Intl.NumberFormat('en-FI',{style:'currency',currency:'EUR'}).format(n);

function productCard(p){
  return `<article class="product-card">
    <div class="image-wrap"><img src="${imageUrl(p.image)}" alt="${p.title}" loading="lazy"></div>
    <div class="product-info">
      <p class="category">${p.category}</p>
      <h3 class="product-title">${p.title}</h3>
      <div class="buy-row"><span class="price">${eur(p.price)}</span></div>
      <div class="card-actions">
        <button class="add-bag" data-add="${p.id}">Add to bag</button>
        <button class="buy-now" data-buy="${p.id}">Buy now</button>
      </div>
    </div>
  </article>`;
}

function visibleProducts(){
  let list = products.filter(p => (category === 'ALL' || p.category === category) && (!query || `${p.title} ${p.category}`.toLowerCase().includes(query)));
  if(sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
  if(sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
  if(sort === 'az') list.sort((a,b)=>a.title.localeCompare(b.title));
  if(sort === 'featured') list.sort((a,b)=>a.featured-b.featured);
  return list;
}

function render(){
  const list = visibleProducts();
  grid.innerHTML = list.map(productCard).join('');
  count.textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;
  empty.hidden = list.length !== 0;
}

function saveBag(){
  localStorage.setItem('kim-bag-v2', JSON.stringify(bag));
  renderBag();
}

function addToBag(id){
  if(!bag.includes(id)) bag.push(id);
  saveBag();
  openBag();
}

function removeFromBag(id){
  bag = bag.filter(x => x !== id);
  saveBag();
}

function renderBag(){
  bagCount.textContent = bag.length;
  if(!bag.length){
    bagItems.innerHTML = '<p class="bag-empty">Your bag is empty.</p>';
    return;
  }
  bagItems.innerHTML = bag.map(id => {
    const p = products.find(x => x.id === id);
    return `<div class="bag-item">
      <img src="${imageUrl(p.image)}" alt="${p.title}">
      <div><h3>${p.title}</h3><p>${eur(p.price)}</p></div>
      <div class="bag-item-actions">
        <button class="mini-buy" data-buy="${p.id}">Checkout</button>
        <button class="remove" data-remove="${p.id}">Remove</button>
      </div>
    </div>`;
  }).join('');
}

function openBag(){
  bagDrawer.classList.add('open');
  bagDrawer.setAttribute('aria-hidden','false');
  scrim.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeBag(){
  bagDrawer.classList.remove('open');
  bagDrawer.setAttribute('aria-hidden','true');
  scrim.hidden = true;
  document.body.style.overflow = '';
}

function buy(id){
  const p = products.find(x => x.id === id);
  if(p?.checkout) window.location.href = p.checkout;
}

document.querySelectorAll('[data-category]').forEach(btn => btn.addEventListener('click', () => {
  category = btn.dataset.category;
  document.querySelectorAll('[data-category]').forEach(x => x.classList.toggle('active', x === btn));
  render();
}));

searchInput.addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); render(); });
sortSelect.addEventListener('change', e => { sort = e.target.value; render(); });
document.querySelector('#headerSearch').addEventListener('click', () => { searchInput.focus(); searchInput.scrollIntoView({behavior:'smooth', block:'center'}); });
document.querySelector('#bagToggle').addEventListener('click', openBag);
document.querySelector('#bagClose').addEventListener('click', closeBag);
scrim.addEventListener('click', closeBag);
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeBag(); });
document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  const buyBtn = e.target.closest('[data-buy]');
  const remove = e.target.closest('[data-remove]');
  if(add) addToBag(add.dataset.add);
  if(buyBtn) buy(buyBtn.dataset.buy);
  if(remove) removeFromBag(remove.dataset.remove);
});

render();
renderBag();
