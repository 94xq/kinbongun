const products = [
  {id:'premium-box',category:'BUNDLES',title:'PREMIUM BOX',image:'assets/premium-box.png',price:39.99,checkout:'https://buy.stripe.com/aFaeV531Lc9pfNs8js5Rm0b'},
  {id:'starter-box',category:'BUNDLES',title:'STARTER BOX',image:'assets/starter-box.png',price:29.99,checkout:'https://buy.stripe.com/5kQ5kv59T8Xdat8dDM5Rm0c'},
  {id:'starter-bundle',category:'BUNDLES',title:'STARTER BUNDLE',image:'assets/starter-bundle.png',price:34.99,checkout:'https://buy.stripe.com/14A3cnfOx2yP1WC0R05Rm0d'},
  {id:'knitwear-bundle',category:'BUNDLES',title:'KNITWEAR BUNDLE',image:'assets/knitwear-bundle.png',price:39.99,checkout:'https://buy.stripe.com/14AfZ91XH2yP1WC6bk5Rm0e'},
  {id:'summer-bundle',category:'BUNDLES',title:'SUMMER BUNDLE',image:'assets/summer-bundle.jpg',price:29.99,checkout:'https://buy.stripe.com/8x24grdGp3CTeJo6bk5Rm0f'},
  {id:'fragrance-bundle',category:'BUNDLES',title:'FRAGRANCE BUNDLE',image:'assets/fragrance-bundle.jpg',price:34.99,checkout:'https://buy.stripe.com/cNi7sD59T5L1cBg8js5Rm0g'},
  {id:'essentials-bundle',category:'BUNDLES',title:'ESSENTIALS BUNDLE',image:'assets/starter-bundle.png',price:34.99,checkout:'https://buy.stripe.com/6oU3cn8m5a1h8l043c5Rm0h'},
  {id:'grey-zip-hoodie',category:'CLOTHING',title:'GREY ZIP HOODIE',image:'assets/grey-zip-hoodie.jpg',price:22.99,checkout:'https://buy.stripe.com/3cIbITcCl1uL30G9nw5Rm00'},
  {id:'black-puffer-jacket',category:'CLOTHING',title:'BLACK PUFFER JACKET',image:'assets/black-puffer.jpg',price:29.99,checkout:'https://buy.stripe.com/9B63cneKt7T944KeHQ5Rm01'},
  {id:'navy-cable-knit-sweater',category:'CLOTHING',title:'NAVY CABLE KNIT SWEATER',image:'assets/navy-knit-sweater.png',price:24.99,checkout:'https://buy.stripe.com/eVq6oz7i1flB6cS2Z85Rm02'},
  {id:'navy-zip-hoodie',category:'CLOTHING',title:'NAVY ZIP HOODIE',image:'assets/navy-zip-hoodie.png',price:22.99,checkout:'https://buy.stripe.com/9B614fbyhgpF7gWarA5Rm03'},
  {id:'black-graphic-hoodie',category:'CLOTHING',title:'BLACK GRAPHIC HOODIE',image:'assets/black-graphic-hoodie.png',price:19.99,checkout:'https://buy.stripe.com/cNieV56dX6P5gRwdDM5Rm04'},
  {id:'black-tracksuit',category:'CLOTHING',title:'BLACK TRACKSUIT',image:'assets/black-graphic-hoodie.png',price:27.99,checkout:'https://buy.stripe.com/3cIfZ9dGp6P59p4dDM5Rm05'},
  {id:'grey-cardholder',category:'ACCESSORIES',title:'GREY CARDHOLDER',image:'assets/grey-cardholder.jpg',price:8.99,checkout:'https://buy.stripe.com/bJe7sD6dX8Xd1WCgPY5Rm06'},
  {id:'black-patterned-belt',category:'ACCESSORIES',title:'BLACK PATTERNED BELT',image:'assets/black-patterned-belt.png',price:11.99,checkout:'https://buy.stripe.com/5kQ14fbyhb5l44K9nw5Rm07'},
  {id:'gold-fragrance',category:'FRAGRANCES',title:'GOLD FRAGRANCE',image:'assets/fragrance-bundle.jpg',price:17.99,checkout:'https://buy.stripe.com/dRm14ffOxb5l7gWbvE5Rm08'},
  {id:'roma-fragrance',category:'FRAGRANCES',title:'ROMA FRAGRANCE',image:'assets/roma-fragrance.jpg',price:17.99,checkout:'https://buy.stripe.com/3cI7sD1XH1uL30GeHQ5Rm09'},
  {id:'classic-fragrance',category:'FRAGRANCES',title:'CLASSIC FRAGRANCE',image:'assets/roma-fragrance.jpg',price:17.99,checkout:'https://buy.stripe.com/9B628j9q9flB8l0fLU5Rm0a'}
];

const bundleGrid = document.querySelector('#bundleGrid');
const featuredGrid = document.querySelector('#featuredGrid');
const bagDrawer = document.querySelector('#bagDrawer');
const bagItems = document.querySelector('#bagItems');
const bagCount = document.querySelector('#bagCount');
const scrim = document.querySelector('#scrim');
const searchPanel = document.querySelector('#searchPanel');
const searchInput = document.querySelector('#searchInput');
let bag = JSON.parse(localStorage.getItem('kim-bag') || '[]');
bag = bag.filter(id => products.some(product => product.id === id));
localStorage.setItem('kim-bag', JSON.stringify(bag));
let activeFilter = 'ALL';
let searchQuery = '';

const money = value => new Intl.NumberFormat('en-IE', {style:'currency',currency:'EUR'}).format(value);

function card(product){
  return `<article class="product-card" data-category="${product.category}" data-title="${product.title.toLowerCase()}">
    <div class="product-image"><img src="${product.image}" alt="${product.title} product photo" loading="lazy"></div>
    <p class="product-category">${product.category}</p>
    <h3 class="product-title">${product.title}</h3>
    <div class="product-meta"><span>${money(product.price)}</span><span>EUR</span></div>
    <div class="product-actions">
      <button class="add-btn" data-add="${product.id}">Add to bag</button>
      <a class="buy-btn" href="${product.checkout}">Buy now</a>
    </div>
  </article>`;
}

function renderProducts(){
  const bundles = products.filter(p => p.category === 'BUNDLES');
  const featured = products.filter(p => p.category !== 'BUNDLES');
  bundleGrid.innerHTML = bundles.map(card).join('');
  featuredGrid.innerHTML = featured.map(card).join('');
  applyFilter();
}

function applyFilter(){
  document.querySelectorAll('.product-card').forEach(el => {
    const category = el.dataset.category;
    const title = el.dataset.title;
    const categoryMatch = activeFilter === 'ALL' || category === activeFilter;
    const searchMatch = !searchQuery || title.includes(searchQuery) || category.toLowerCase().includes(searchQuery);
    el.classList.toggle('hidden-by-filter', !(categoryMatch && searchMatch));
  });
}

function addToBag(id){
  if(!bag.includes(id)) bag.push(id);
  localStorage.setItem('kim-bag', JSON.stringify(bag));
  renderBag();
  openBag();
}

function removeFromBag(id){
  bag = bag.filter(item => item !== id);
  localStorage.setItem('kim-bag', JSON.stringify(bag));
  renderBag();
}

function renderBag(){
  bagCount.textContent = bag.length;
  if(!bag.length){
    bagItems.innerHTML = '<p class="bag-empty">Your bag is empty.</p>';
    return;
  }
  bagItems.innerHTML = bag.map(id => {
    const p = products.find(x => x.id === id);
    if(!p) return '';
    return `<div class="bag-row">
      <img src="${p.image}" alt="${p.title}">
      <div><h3>${p.title}</h3><p>${p.category} · ${money(p.price)}</p><a class="checkout-link" href="${p.checkout}">Checkout with Stripe</a></div>
      <button class="remove-btn" data-remove="${p.id}" aria-label="Remove ${p.title}">×</button>
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

document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  const remove = e.target.closest('[data-remove]');
  const filter = e.target.closest('[data-filter]');
  if(add) addToBag(add.dataset.add);
  if(remove) removeFromBag(remove.dataset.remove);
  if(filter){
    activeFilter = filter.dataset.filter;
    applyFilter();
    document.querySelector('#catalog').scrollIntoView({behavior:'smooth'});
  }
});

document.querySelector('#bagToggle').addEventListener('click', openBag);
document.querySelector('#bagClose').addEventListener('click', closeBag);
scrim.addEventListener('click', closeBag);
document.querySelector('#searchToggle').addEventListener('click', () => {
  searchPanel.hidden = false;
  requestAnimationFrame(() => searchInput.focus());
});
document.querySelector('#searchClose').addEventListener('click', () => {
  searchPanel.hidden = true;
  searchInput.value = '';
  searchQuery = '';
  applyFilter();
});
searchInput.addEventListener('input', e => {
  searchQuery = e.target.value.trim().toLowerCase();
  applyFilter();
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    closeBag();
    searchPanel.hidden = true;
  }
});

renderProducts();
renderBag();
