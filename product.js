const products=window.KIM_PRODUCTS||[];
const params=new URLSearchParams(location.search),id=params.get('id'),p=products.find(x=>x.id===id)||products[0];
const eur=n=>new Intl.NumberFormat('en-FI',{style:'currency',currency:'EUR'}).format(n),VER='20260913-v5';
const asset=src=>`${src}?v=${VER}`;
if(!p){location.href='index.html#catalog';}
else{
  document.title=`${p.title} — KIM`;
  document.querySelector('#breadcrumbName').textContent=p.title;
  document.querySelector('#productCategory').textContent=p.category;
  document.querySelector('#productTitle').textContent=p.title;
  document.querySelector('#productPrice').textContent=eur(p.price);
  document.querySelector('#selectionPrice').textContent=eur(p.price);
  document.querySelector('#productDescription').textContent=p.description||'A selected piece from the KIM collection.';

  const gallery=(p.gallery?.length?p.gallery:[p.image]);
  const im=document.querySelector('#productImage');
  const setImage=(src,button)=>{
    im.classList.add('switching');
    setTimeout(()=>{im.src=asset(src);im.alt=p.title;im.onload=()=>im.classList.remove('switching')},90);
    document.querySelectorAll('.thumb-btn').forEach(x=>x.classList.toggle('active',x===button));
  };
  im.src=asset(gallery[0]);im.alt=p.title;
  const thumbRow=document.querySelector('#thumbRow');
  if(gallery.length>1){
    thumbRow.hidden=false;
    thumbRow.innerHTML=gallery.map((src,i)=>`<button class="thumb-btn${i===0?' active':''}" data-src="${src}" aria-label="View image ${i+1}"><img src="${asset(src)}" alt=""></button>`).join('');
    thumbRow.addEventListener('click',e=>{const b=e.target.closest('.thumb-btn');if(b)setImage(b.dataset.src,b)});
  }

  const sizeBlock=document.querySelector('#sizeBlock'),sizeSelect=document.querySelector('#sizeSelect');
  if(p.sizes?.length){sizeBlock.hidden=false;sizeSelect.innerHTML=p.sizes.map(s=>`<option value="${s}">${s}</option>`).join('')}

  const bagKey='kim-bag-v4';
  const bag=JSON.parse(localStorage.getItem(bagKey)||'[]');
  document.querySelector('#bagCount').textContent=bag.length;
  const add=document.querySelector('#productAdd');
  add.onclick=()=>{
    if(!bag.includes(p.id))bag.push(p.id);
    localStorage.setItem(bagKey,JSON.stringify(bag));
    document.querySelector('#bagCount').textContent=bag.length;
    add.textContent='Added ✓';add.classList.add('added');
    setTimeout(()=>{add.textContent='Add to bag';add.classList.remove('added')},1200)
  };

  const buy=document.querySelector('#productBuy');
  if(p.checkout){buy.onclick=()=>{document.body.classList.add('page-leaving');setTimeout(()=>location.href=p.checkout,120)}}
  else{buy.disabled=true;buy.textContent='Checkout coming soon'};

  const same=products.filter(x=>x.id!==p.id&&x.category===p.category);
  const rest=products.filter(x=>x.id!==p.id&&x.category!==p.category);
  const related=[...same,...rest].slice(0,4);
  document.querySelector('#relatedGrid').innerHTML=related.map(x=>`<article class="related-card glass"><a class="related-link" href="product.html?id=${encodeURIComponent(x.id)}"><img src="${asset(x.image)}" alt="${x.title}"><p>${x.category}</p><h3>${x.title}</h3><strong>${eur(x.price)}</strong></a></article>`).join('');
}
