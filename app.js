const products = [
  {id:'premium-box',category:'BUNDLES',title:'PREMIUM BOX',image:'assets/premium-box.png'},
  {id:'starter-box',category:'BUNDLES',title:'STARTER BOX',image:'assets/starter-box.png'},
  {id:'starter-bundle',category:'BUNDLES',title:'STARTER BUNDLE',image:'assets/starter-bundle.png'},
  {id:'knitwear-bundle',category:'BUNDLES',title:'KNITWEAR BUNDLE',image:'assets/knitwear-bundle.png'},
  {id:'summer-bundle',category:'BUNDLES',title:'SUMMER BUNDLE',image:'assets/summer-bundle.jpg'},
  {id:'fragrance-bundle',category:'BUNDLES',title:'FRAGRANCE BUNDLE',image:'assets/fragrance-bundle.jpg'},
  {id:'essentials-bundle',category:'BUNDLES',title:'ESSENTIALS BUNDLE',image:'assets/starter-bundle.png'},
  {id:'grey-zip-hoodie',category:'CLOTHING',title:'GREY ZIP HOODIE',image:'assets/grey-zip-hoodie.jpg'},
  {id:'black-puffer',category:'CLOTHING',title:'BLACK PUFFER JACKET',image:'assets/black-puffer.jpg'},
  {id:'navy-knit-sweater',category:'CLOTHING',title:'NAVY CABLE KNIT SWEATER',image:'assets/navy-knit-sweater.png'},
  {id:'navy-zip-hoodie',category:'CLOTHING',title:'NAVY ZIP HOODIE',image:'assets/navy-zip-hoodie.png'},
  {id:'black-graphic-hoodie',category:'CLOTHING',title:'BLACK GRAPHIC HOODIE',image:'assets/black-graphic-hoodie.png'},
  {id:'black-tracksuit',category:'CLOTHING',title:'BLACK TRACKSUIT',image:'assets/black-graphic-hoodie.png'},
  {id:'grey-cardholder',category:'ACCESSORIES',title:'GREY CARDHOLDER',image:'assets/grey-cardholder.jpg'},
  {id:'black-patterned-belt',category:'ACCESSORIES',title:'BLACK PATTERNED BELT',image:'assets/black-patterned-belt.png'},
  {id:'gold-fragrance',category:'FRAGRANCES',title:'GOLD FRAGRANCE',image:'assets/fragrance-bundle.jpg'},
  {id:'roma-fragrance',category:'FRAGRANCES',title:'ROMA FRAGRANCE',image:'assets/roma-fragrance.jpg'},
  {id:'classic-fragrance',category:'FRAGRANCES',title:'CLASSIC FRAGRANCE',image:'assets/roma-fragrance.jpg'},
  {id:'pro-phone',category:'ELECTRONICS',title:'PRO PHONE',image:'assets/pro-phone.png'},
  {id:'wireless-earbuds',category:'ELECTRONICS',title:'WIRELESS EARBUDS',image:'assets/wireless-earbuds.png'},
  {id:'reselling-course',category:'COURSES',title:'RESELLING COURSE',image:'assets/reselling-course.jpg'}
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
let activeFilter = 'ALL';
let searchQuery = '';

function card(product){
  return `<article class="product-card" data-category="${product.category}" data-title="${product.title.toLowerCase()}">
    <div class="product-image"><img src="${product.image}" alt="${product.title} product photo" loading="lazy"></div>
    <p class="product-category">${product.category}</p>
    <h3 class="product-title">${product.title}</h3>
    <div class="product-meta"><span>Coming soon</span><span>EUR €</span></div>
    <button class="add-btn" data-add="${product.id}">Add ${product.title.replaceAll('-', ' ')} to bag <span>— Soon</span></button>
  </article>`;
}
function renderProducts(){const bundles=products.filter(p=>p.category==='BUNDLES');const featured=products.filter(p=>p.category!=='BUNDLES');bundleGrid.innerHTML=bundles.map(card).join('');featuredGrid.innerHTML=featured.map(card).join('');applyFilter();}
function applyFilter(){document.querySelectorAll('.product-card').forEach(el=>{const category=el.dataset.category;const title=el.dataset.title;const categoryMatch=activeFilter==='ALL'||category===activeFilter;const searchMatch=!searchQuery||title.includes(searchQuery)||category.toLowerCase().includes(searchQuery);el.classList.toggle('hidden-by-filter',!(categoryMatch&&searchMatch));});}
function addToBag(id){if(!bag.includes(id))bag.push(id);localStorage.setItem('kim-bag',JSON.stringify(bag));renderBag();openBag();}
function removeFromBag(id){bag=bag.filter(item=>item!==id);localStorage.setItem('kim-bag',JSON.stringify(bag));renderBag();}
function renderBag(){bagCount.textContent=bag.length;if(!bag.length){bagItems.innerHTML='<p class="bag-empty">Your bag is empty.</p>';return;}bagItems.innerHTML=bag.map(id=>{const p=products.find(x=>x.id===id);return `<div class="bag-row"><img src="${p.image}" alt="${p.title}"><div><h3>${p.title}</h3><p>${p.category} · Coming soon</p></div><button class="remove-btn" data-remove="${p.id}" aria-label="Remove ${p.title}">×</button></div>`;}).join('');}
function openBag(){bagDrawer.classList.add('open');bagDrawer.setAttribute('aria-hidden','false');scrim.hidden=false;document.body.style.overflow='hidden';}
function closeBag(){bagDrawer.classList.remove('open');bagDrawer.setAttribute('aria-hidden','true');scrim.hidden=true;document.body.style.overflow='';}
document.addEventListener('click',e=>{const add=e.target.closest('[data-add]');const remove=e.target.closest('[data-remove]');const filter=e.target.closest('[data-filter]');if(add)addToBag(add.dataset.add);if(remove)removeFromBag(remove.dataset.remove);if(filter){activeFilter=filter.dataset.filter;applyFilter();document.querySelector('#catalog').scrollIntoView({behavior:'smooth'});}});
document.querySelector('#bagToggle').addEventListener('click',openBag);document.querySelector('#bagClose').addEventListener('click',closeBag);scrim.addEventListener('click',closeBag);document.querySelector('#searchToggle').addEventListener('click',()=>{searchPanel.hidden=false;requestAnimationFrame(()=>searchInput.focus());});document.querySelector('#searchClose').addEventListener('click',()=>{searchPanel.hidden=true;searchInput.value='';searchQuery='';applyFilter();});searchInput.addEventListener('input',e=>{searchQuery=e.target.value.trim().toLowerCase();applyFilter();});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeBag();searchPanel.hidden=true;}});renderProducts();renderBag();
