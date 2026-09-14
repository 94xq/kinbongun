(()=>{
  const links=[...document.querySelectorAll('.nav-left a[data-nav]')];
  const indicator=document.querySelector('.nav-indicator');
  const nav=document.querySelector('.nav-left');
  if(links.length&&indicator&&nav){
    let active=null;
    const place=(link,animate=true)=>{
      if(!link)return;
      active=link;
      links.forEach(a=>a.classList.toggle('active',a===link));
      const nr=nav.getBoundingClientRect(),lr=link.getBoundingClientRect();
      if(!animate) indicator.style.transition='none';
      indicator.style.width=`${lr.width}px`;
      indicator.style.transform=`translate3d(${lr.left-nr.left}px,0,0)`;
      requestAnimationFrame(()=>{indicator.style.transition=''; if(animate){indicator.animate([{filter:'brightness(1)'},{filter:'brightness(1.8)'},{filter:'brightness(1)'}],{duration:430,easing:'ease-out'})}});
    };
    const byName=name=>links.find(a=>a.dataset.nav===name);
    const initial=((location.hash||'').replace('#','')||document.body.dataset.nav||'home');
    place(byName(initial)||links[0],false);
    addEventListener('resize',()=>place(active||links[0],false));

    links.forEach(a=>a.addEventListener('click',e=>{
      const href=a.getAttribute('href');
      if(href?.startsWith('#')){
        e.preventDefault();
        place(a,true);
        const target=document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth',block:'start'});
          target.animate([{opacity:.72,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:520,easing:'cubic-bezier(.2,.8,.2,1)'});
        }
        history.replaceState(null,'',href);
      }
    }));

    const sections=['home','catalog','contact'].map(id=>document.getElementById(id)).filter(Boolean);
    if(sections.length){
      const io=new IntersectionObserver(es=>{
        const visible=es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
        if(visible)place(byName(visible.target.id),true);
      },{rootMargin:'-32% 0px -52% 0px',threshold:[0,.12,.3,.55]});
      sections.forEach(s=>io.observe(s));
    }
  }

  const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll('.reveal,.product-card').forEach(el=>ro.observe(el));

  document.addEventListener('click',e=>{
    const link=e.target.closest('a[href^="product.html"]');
    if(!link||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    e.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(()=>location.href=link.href,145);
  });
})();
